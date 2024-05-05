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

  get senderClasses() {
    return {
      'surface-200 align-items-start': !this.isSender,
      'align-items-end bg-primary text-white': this.isSender,
    }
  }

  get radiusClasses() {
    return {
      'from-user': this.isSender,
      'from-others': !this.isSender,
      first: this.isFirstInSequence,
      last: this.isLastInSequence,
    }
  }

  get dynamicClasses() {
    return { ...this.radiusClasses, ...this.senderClasses }
  }
}
