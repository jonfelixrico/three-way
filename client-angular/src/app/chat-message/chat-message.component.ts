import { Component, Input } from '@angular/core'
import { ChatMessage } from '../chat-services/chat-rest-api.types'

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
})
export class ChatMessageComponent {
  @Input({
    required: true,
  })
  message!: ChatMessage

  get sendTsString() {
    return new Date(this.message.timestamp)
  }

  @Input()
  isSender = false
}
