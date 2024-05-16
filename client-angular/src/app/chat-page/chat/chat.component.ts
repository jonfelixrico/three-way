import { Component, Input, afterNextRender } from '@angular/core'
import { IdentityService } from '@/user/identity.service'
import { MessageService } from '@/chat-services/message.service'
import { Select, Store } from '@ngxs/store'
import { ChatActions } from '@/chat-services/chat.actions'
import { Observable, map } from 'rxjs'
import { ChatSliceModel } from '@/chat-services/chat.slice'
import { toSignal } from '@angular/core/rxjs-interop'
import { RealtimeService } from '@/realtime/realtime.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @Select() chat$!: Observable<ChatSliceModel>

  @Input() chatId!: string

  private history$ = this.chat$.pipe(
    map((state) => state.chatHistories[this.chatId])
  )

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
    private store: Store,
    private realtime: RealtimeService
  ) {
    afterNextRender(() => {
      this.loadMessages()
    })
  }

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

  private async loadMessages() {
    const alreadyLoaded = this.store.selectSnapshot(
      ({ chat }: { chat: ChatSliceModel }) => !!chat.chatHistories[this.chatId]
    )
    if (alreadyLoaded) {
      return
    }

    const messages = await this.messageSvc.getMessages(this.chatId)
    this.store.dispatch(
      new ChatActions.AddHistoricalMessages(this.chatId, messages)
    )
  }
}
