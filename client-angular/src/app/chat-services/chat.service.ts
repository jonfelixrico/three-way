import { Chat } from '@/chat-services/chat-rest-api.types'
import { ChatActions } from '@/chat-services/chat.actions'
import { ChatSliceModel } from '@/chat-services/chat.slice'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngxs/store'
import { firstValueFrom } from 'rxjs'

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
      options?.force &&
      this.chatSlice.chats['chatId']?.status === 'HYDRATED'
    ) {
      return
    }

    const chat = await firstValueFrom(
      this.http.get<Chat>(`/api/chat/${chatId}`)
    )

    this.store.dispatch(
      new ChatActions.Set({
        ...chat,
        status: 'HYDRATED',
      })
    )
  }

  async addUserToChat(chatId: string, data: { userIds: string[] }) {
    await firstValueFrom(this.http.post(`/api/chat/${chatId}/user`, data))
    await this.loadChatIntoState(chatId, {
      force: true,
    })
  }
}
