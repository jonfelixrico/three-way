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

  @Input()
  isSender = false

  get senderClasses() {
    if (!this.isSender) {
      return ['surface-200', 'align-items-start']
    }

    return ['align-items-end', 'bg-primary-300']
  }
}
