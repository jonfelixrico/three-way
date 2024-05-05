import { NgModule } from '@angular/core'
import { CommonModule, NgFor } from '@angular/common'

import { ChatRoutingModule } from './chat-routing.module'
import { ChatComponent } from './chat.component'
import { ChatMessageComponent } from '../chat-message/chat-message.component'
import { InputTextModule } from 'primeng/inputtext'
import { ChatServicesModule } from '../chat-services/chat-services.module'
import { UserModule } from '../user/user.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [ChatComponent, ChatMessageComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NgFor,
    InputTextModule,
    ChatServicesModule,
    UserModule,
    FormsModule,
  ],
})
export class ChatModule {}
