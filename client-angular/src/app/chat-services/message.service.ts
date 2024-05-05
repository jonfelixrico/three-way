import { Injectable } from '@angular/core'
import { ChatMessage } from './chat-rest-api.types'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { IdentityService } from '../user/identity.service'

@Injectable()
export class MessageService {
  constructor(
    private http: HttpClient,
    private identitySvc: IdentityService
  ) {}

  async getMessages(chatId: string) {
    return await firstValueFrom(
      this.http.get<ChatMessage[]>(`/api/chat/${chatId}/message`)
    )
  }

  async sendMessage(chatId: string, content: string): Promise<ChatMessage> {
    return await firstValueFrom(
      this.http.post<ChatMessage>(`/api/chat/${chatId}/message`, {
        content,
        senderId: this.identitySvc.getUserId(),
      })
    )
  }
}
