import { Component, Input } from '@angular/core'
import { ChatMessage } from '../chat-services/chat-rest-api.types'

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

  @Input()
  isSender = false

  @Input()
  isFirstInSequence = false

  @Input()
  isLastInSequence = false

  @Input()
  isFirstInChat = false

  get containerClasses() {
    const { isSender, isFirstInChat, isFirstInSequence } = this

    return {
      'align-items-end': isSender,
      'align-items-start': !isSender,

      'mt-1': !isFirstInChat && !isFirstInSequence,
      'mt-5': !isFirstInChat && isFirstInSequence,
    }
  }

  get bubbleClasses() {
    return {
      'surface-200 align-items-start from-others': !this.isSender,
      'align-items-end bg-primary text-white from-user': this.isSender,
      first: this.isFirstInSequence,
      last: this.isLastInSequence,
    }
  }
}
