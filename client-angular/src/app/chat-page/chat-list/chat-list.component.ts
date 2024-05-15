import { Observable, map } from 'rxjs'
import { ChatService } from '@/chat-services/chat.service'
import { Component, OnInit, Signal, afterNextRender } from '@angular/core'
import { Select } from '@ngxs/store'
import { ChatSliceModel } from '@/chat-services/chat.slice'
import { Chat } from '@/chat-services/chat-rest-api.types'
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  @Select() chat$!: Observable<ChatSliceModel>

  chats: Signal<Chat[]>

  constructor(chatSvc: ChatService) {
    this.chats = toSignal(
      this.chat$.pipe(map(({ chats }) => Object.values(chats))),
      {
        initialValue: [],
      }
    )

    afterNextRender(() => {
      chatSvc.loadListIntoState()
    })
  }
}
