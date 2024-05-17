import { NgModule } from '@angular/core'
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common'

import { ChatPageRoutingModule } from './chat-page-routing.module'
import { ChatPageComponent } from './chat-page.component'
import { ChatMessageComponent } from './chat-message/chat-message.component'
import { InputTextModule } from 'primeng/inputtext'
import { ChatServicesModule } from '@/chat-services/chat-services.module'
import { UserModule } from '@/user/user.module'
import { FormsModule } from '@angular/forms'
import { RealtimeModule } from '@/realtime/realtime.module'
import { ButtonModule } from 'primeng/button'
import { MenuButtonComponent } from './menu-button/menu-button.component'
import { MenuModule } from 'primeng/menu'

@NgModule({
  declarations: [ChatPageComponent, ChatMessageComponent, MenuButtonComponent],
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
    ButtonModule,
    MenuModule,
  ],
})
export class ChatPageModule {}
