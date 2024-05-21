import { Component, Input } from '@angular/core'
import { IdentityService } from '@/user/identity.service'
import { MessageService } from '@/chat-services/message.service'
import { Select, Store } from '@ngxs/store'
import { ChatActions } from '@/chat-services/chat.actions'
import { Observable, map } from 'rxjs'
import { ChatSliceModel } from '@/chat-services/chat.slice'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-chat',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent {
  @Select() chat$!: Observable<ChatSliceModel>

  @Input() chatId!: string

  private readonly history$ = this.chat$.pipe(
    map((state) => state.chatHistories[this.chatId])
  )

  readonly data$ = this.chat$.pipe(map((state) => state.chats[this.chatId]))

  messages = toSignal(
    this.history$.pipe(map((history) => history?.messages ?? [])),
    {
      initialValue: [],
    }
  )

  content: string = ''

  constructor(
    private identitySvc: IdentityService,
    private messageSvc: MessageService,
    private store: Store
  ) {}

  get userId() {
    return this.identitySvc.user!.id
  }

  async sendMessage() {
    if (!this.content) {
      return
    }

    const content = this.content
    this.content = ''

    const message = await this.messageSvc.sendMessage(this.chatId, content)
    this.store.dispatch(new ChatActions.AddMessages(this.chatId, [message]))
  }
}
