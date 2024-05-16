import { Component, Signal, afterNextRender } from '@angular/core'
import { ChatMessage } from '@/chat-services/chat-rest-api.types'
import { IdentityService } from '@/user/identity.service'
import { MessageService } from '@/chat-services/message.service'
import { Select, Store } from '@ngxs/store'
import { ChatActions } from '@/chat-services/chat.actions'
import { Observable, map } from 'rxjs'
import { ChatSliceModel } from '@/chat-services/chat.slice'
import { toSignal } from '@angular/core/rxjs-interop'
import { RealtimeService } from '@/realtime/realtime.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  @Select() chat$!: Observable<ChatSliceModel>

  messages: Signal<ChatMessage[]>

  content: string = ''

  constructor(
    private identitySvc: IdentityService,
    private messageSvc: MessageService,
    private store: Store,
    private realtime: RealtimeService,
    private route: ActivatedRoute
  ) {
    this.messages = toSignal(
      this.chat$.pipe(
        map((chat) => chat.chatHistories[this.chatId]?.messages ?? [])
      ),
      {
        initialValue: [],
      }
    )

    afterNextRender(() => {
      this.loadMessages()
      this.connectWs()
    })
  }

  get chatId() {
    return this.route.snapshot.paramMap.get('chatId')!
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
    const messages = await this.messageSvc.getMessages(this.chatId)
    this.store.dispatch(new ChatActions.AddMessages(this.chatId, messages))
  }

  private async connectWs() {
    const socket = await this.realtime.connect()
    socket.on('message', (payload) => {
      if (payload.MESSAGE_SENT) {
        this.store.dispatch(
          new ChatActions.AddMessages(this.chatId, [payload.MESSAGE_SENT])
        )
      }
    })
  }
}
