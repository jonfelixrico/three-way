import { NgModule } from '@angular/core'
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common'

import { ChatRoomRoutingModule } from './chat-room-routing.module'
import { ChatComponent } from './chat/chat.component'
import { ChatMessageComponent } from './chat-message/chat-message.component'
import { InputTextModule } from 'primeng/inputtext'
import { ChatServicesModule } from '@/chat-services/chat-services.module'
import { UserModule } from '@/user/user.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [ChatComponent, ChatMessageComponent],
  imports: [
    CommonModule,
    ChatRoomRoutingModule,
    NgFor,
    InputTextModule,
    ChatServicesModule,
    UserModule,
    FormsModule,
    NgIf,
    NgClass,
  ],
})
export class ChatRoomModule {}
