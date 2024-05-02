import { Component, Input } from '@angular/core'
import { ChatMessage } from '../chat-rest-api/chat-rest-api.types'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @Input()
  message: ChatMessage[] = []
}
