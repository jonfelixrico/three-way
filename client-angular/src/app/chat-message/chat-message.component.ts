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
      classes.push('border-round-left-3xl', 'border-round-right-lg')
    } else {
      classes.push('border-round-right-3xl', 'border-round-left-lg')
    }

    if (this.isFirstInSequence && !this.isLastInSequence) {
      classes.push('border-round-bottom-lg', 'border-round-top-3xl')
    } else if (!this.isFirstInSequence && this.isLastInSequence) {
      classes.push('border-round-bottom-3xl', 'border-round-top-lg')
    } else if (this.isFirstInSequence && this.isLastInSequence) {
      classes.push('border-round-bottom-3xl', 'border-round-top-3xl')
    } else {
      classes.push('border-round-bottom-lg', 'border-round-top-lg')
    }

    return classes
  }

  get dynamicClasses() {
    return [...this.radiusClasses, ...this.senderClasses]
  }
}
