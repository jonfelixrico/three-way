import { Injectable } from '@angular/core'
import { State } from '@ngxs/store'
import { ChatMessage } from '../chat-services/chat-rest-api.types'

export interface Chat {
  messages: ChatMessage[]
}

export interface ChatState {
  chats: {
    [chatId: string]: Chat
  }
}

@State({
  name: 'chat',
})
@Injectable()
export class ChatSlice {}
