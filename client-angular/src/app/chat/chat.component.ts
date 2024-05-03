import { Component, Signal, afterNextRender } from '@angular/core'
import { ChatMessage } from '../chat-services/chat-rest-api.types'
import { IdentityService } from '../user/identity.service'
import { MessageService } from '../chat-services/message.service'
import { Select, Store } from '@ngxs/store'
import { ChatActions } from '../chat-services/chat.actions'
import { Observable, map } from 'rxjs'
import { ChatSliceModel } from '../chat-services/chat.slice'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  readonly userId: string

  @Select() chat$!: Observable<ChatSliceModel>

  messages: Signal<ChatMessage[]>

  constructor(
    identitySvc: IdentityService,
    private messageSvc: MessageService,
    private store: Store
  ) {
    this.userId = identitySvc.getUserId()
    this.messages = toSignal(
      this.chat$.pipe(map((chat) => chat.chats['global']?.messages ?? [])),
      {
        initialValue: [],
      }
    )

    afterNextRender(() => {
      this.loadMessages()
    })
  }

  get messages$() {
    return
  }

  private async loadMessages() {
    const messages = await this.messageSvc.getMessages('global')
    this.store.dispatch(new ChatActions.Add(messages))
  }
}
