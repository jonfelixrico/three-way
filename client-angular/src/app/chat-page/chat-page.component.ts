import { Component, computed, input } from '@angular/core'
import { IdentityService } from '@/user/identity.service'
import { MessageService } from '@/chat-services/message.service'
import { Select, Store } from '@ngxs/store'
import { ChatActions } from '@/chat-services/chat.actions'
import { Observable } from 'rxjs'
import { ChatSliceModel } from '@/chat-services/chat.slice'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-chat',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
})
export class ChatPageComponent {
  @Select() chat$!: Observable<ChatSliceModel>
  private chatSlice = toSignal(this.chat$, {
    requireSync: true,
  })

  chatId = input('')

  chatRoom = computed(() => this.chatSlice().chats[this.chatId()])
  messages = computed(
    () => this.chatSlice().chatHistories[this.chatId()]?.messages ?? []
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

    const message = await this.messageSvc.sendMessage(this.chatId(), content)
    this.store.dispatch(new ChatActions.AddMessages(this.chatId(), [message]))
  }
}
