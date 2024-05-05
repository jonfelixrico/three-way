import { NgModule } from '@angular/core'
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common'

import { ChatPageRoutingModule } from './chat-page-routing.module'
import { ChatComponent } from './chat/chat.component'
import { ChatMessageComponent } from './chat-message/chat-message.component'
import { InputTextModule } from 'primeng/inputtext'
import { ChatServicesModule } from '@/chat-services/chat-services.module'
import { UserModule } from '@/user/user.module'
import { FormsModule } from '@angular/forms'
import { RealtimeModule } from '@/realtime/realtime.module'

@NgModule({
  declarations: [ChatComponent, ChatMessageComponent],
  imports: [
    CommonModule,
    ChatPageRoutingModule,
    NgFor,
    InputTextModule,
    ChatServicesModule,
    UserModule,
    FormsModule,
    NgIf,
    NgClass,
    RealtimeModule,
  ],
})
export class ChatPageModule {}
