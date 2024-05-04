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

  get senderClasses() {
    if (!this.isSender) {
      return ['surface-200', 'align-items-start']
    }

    return ['align-items-end', 'bg-primary', 'text-white']
  }

  get radiusClasses() {
    const classes: string[] = []

    if (this.isSender) {
      classes.push('from-user')
    } else {
      classes.push('from-others')
    }

    if (this.isFirstInSequence) {
      classes.push('first')
    }

    if (this.isLastInSequence) {
      classes.push('last')
    }

    return classes
  }

  get dynamicClasses() {
    return [...this.radiusClasses, ...this.senderClasses]
  }
}
