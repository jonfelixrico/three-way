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

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  readonly userId: string

  @Select() chat$!: Observable<ChatSliceModel>

  messages: Signal<ChatMessage[]>

  content: string = ''

  constructor(
    identitySvc: IdentityService,
    private messageSvc: MessageService,
    private store: Store,
    private realtime: RealtimeService
  ) {
    this.userId = identitySvc.user!.id!
    this.messages = toSignal(
      this.chat$.pipe(
        map((chat) => chat.chatMessages['global']?.messages ?? [])
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

  async sendMessage() {
    console.log(this.content)
    if (!this.content) {
      return
    }

    const content = this.content
    this.content = ''

    const message = await this.messageSvc.sendMessage('global', content)
    this.store.dispatch(new ChatActions.Add('global', [message]))
  }

  private async loadMessages() {
    const messages = await this.messageSvc.getMessages('global')
    this.store.dispatch(new ChatActions.Add('global', messages))
  }

  private async connectWs() {
    const socket = await this.realtime.connect()
    socket.on('message', (payload) => {
      if (payload.MESSAGE_SENT) {
        this.store.dispatch(
          new ChatActions.Add('global', [payload.MESSAGE_SENT])
        )
      }
    })
  }
}
