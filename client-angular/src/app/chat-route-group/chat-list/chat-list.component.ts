import { Observable, map } from 'rxjs'
import { Component } from '@angular/core'
import { Select } from '@ngxs/store'
import { ChatSliceModel } from '@/chat-services/chat.slice'

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss',
})
export class ChatListComponent {
  @Select() chat$!: Observable<ChatSliceModel>

  get chatList$() {
    return this.chat$.pipe(map(({ chats }) => Object.values(chats)))
  }
}
