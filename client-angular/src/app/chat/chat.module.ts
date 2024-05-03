import { NgModule } from '@angular/core'
import { CommonModule, NgFor } from '@angular/common'

import { ChatRoutingModule } from './chat-routing.module'
import { ChatComponent } from './chat.component'
import { ChatMessageComponent } from '../chat-message/chat-message.component'

@NgModule({
  declarations: [ChatComponent, ChatMessageComponent],
  imports: [CommonModule, ChatRoutingModule, NgFor],
})
export class ChatModule {}
