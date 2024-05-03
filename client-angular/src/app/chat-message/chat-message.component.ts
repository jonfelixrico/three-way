import { Component, Input } from '@angular/core'
import { ChatMessage } from '../chat-rest-api/chat-rest-api.types'

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  @Input({
    required: true,
  })
  message!: ChatMessage
}
