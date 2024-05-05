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
  isFirst = false

  @Input()
  isLast = false

  get containerClasses() {
    const { isSender, isFirst, isFirstInSequence } = this

    return {
      'align-items-end': isSender,
      'align-items-start': !isSender,

      'mt-1': !isFirst && !isFirstInSequence,
      'mt-5': !isFirst && isFirstInSequence,
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
