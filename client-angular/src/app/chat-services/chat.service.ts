import { Chat } from '@/chat-services/chat-rest-api.types'
import { ChatActions } from '@/chat-services/chat.actions'
import { ChatSliceModel } from '@/chat-services/chat.slice'
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store'
import { catchError, firstValueFrom, of, throwError } from 'rxjs'

@Injectable()
export class ChatService {
  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  private get chatSlice() {
    return this.store.selectSnapshot(
      (state: { chat: ChatSliceModel }) => state.chat
    )
  }

  async loadListIntoState() {
    const chats = await firstValueFrom(
      this.http.get<Omit<Chat, 'members'>[]>('/api/chat')
    )

    for (const chat of chats) {
      this.store.dispatch(
        new ChatActions.Set({
          ...chat,
          members: [],
          status: 'PARTIAL',
        })
      )
    }
  }

  async createChat({ name }: { name: string }) {
    const chat = await firstValueFrom(
      this.http.post<Chat>('/api/chat', {
        name,
      })
    )
    this.store.dispatch(
      new ChatActions.Set({
        ...chat,
        status: 'HYDRATED',
      })
    )

    return chat
  }

  async loadChatIntoState(
    chatId: string,
    options?: Partial<{
      force?: boolean
    }>
  ) {
    if (
      this.chatSlice.chats[chatId]?.status === 'HYDRATED' &&
      !options?.force
    ) {
      return true
    }

    const chat = await firstValueFrom(
      this.http.get<Chat>(`/api/chat/${chatId}`).pipe(
        catchError((err: unknown) => {
          if (
            err instanceof HttpErrorResponse &&
            err.status === HttpStatusCode.Forbidden
          ) {
            return of(null)
          }

          return throwError(() => err)
        })
      )
    )

    if (!chat) {
      return false
    }

    this.store.dispatch(
      new ChatActions.Set({
        ...chat,
        status: 'HYDRATED',
      })
    )

    return true
  }

  async addUserToChat(chatId: string, data: { userIds: string[] }) {
    await firstValueFrom(this.http.post(`/api/chat/${chatId}/user`, data))
    await this.loadChatIntoState(chatId, {
      force: true,
    })
  }
}
