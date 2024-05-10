import { Injectable } from '@angular/core'
import { ChatMessage } from './chat-rest-api.types'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class MessageService {
  constructor(private http: HttpClient) {}

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
