import { NgModule } from '@angular/core'
import { CommonModule, NgFor } from '@angular/common'

import { ChatRoutingModule } from './chat-routing.module'
import { ChatComponent } from './chat.component'
import { ChatMessageComponent } from '../chat-message/chat-message.component'
import { InputTextModule } from 'primeng/inputtext'

@NgModule({
  declarations: [ChatComponent, ChatMessageComponent],
  imports: [CommonModule, ChatRoutingModule, NgFor, InputTextModule],
})
export class ChatModule {}
