import { Injectable } from '@angular/core'
import { ChatMessage } from './chat-rest-api.types'
import { HttpClient } from '@angular/common/http'
import { filter, firstValueFrom, map } from 'rxjs'
import { RealtimeService } from '@/realtime/realtime.service'
import { Store } from '@ngxs/store'
import { ChatActions } from '@/chat-services/chat.actions'

@Injectable()
export class MessageService {
  constructor(
    private http: HttpClient,
    realtimeSvc: RealtimeService,
    store: Store
  ) {
    realtimeSvc
      .getEvents$<{
        MESSAGE_SENT: ChatMessage
      }>()
      .pipe(
        map(({ MESSAGE_SENT }) => MESSAGE_SENT),
        filter(Boolean)
      )
      .subscribe((payload) => {
        store.dispatch(
          new ChatActions.AddMessages(payload.chatRoomId, [payload])
        )
      })
  }

  async getMessages(chatId: string) {
    return await firstValueFrom(
      this.http.get<ChatMessage[]>(`/api/chat/${chatId}/message`)
    )
  }

  async sendMessage(chatId: string, content: string): Promise<ChatMessage> {
    return await firstValueFrom(
      this.http.post<ChatMessage>(`/api/chat/${chatId}/message`, {
        content,
      })
    )
  }
}
