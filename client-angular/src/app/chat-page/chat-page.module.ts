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
import { AddUserService } from '@/chat-page/service.add-user/add-user.service'
import { AddUserDialogContentComponent } from './add-user-dialog-content/add-user-dialog-content.component'

@NgModule({
  declarations: [
    ChatPageComponent,
    ChatMessageComponent,
    MenuButtonComponent,
    AddUserDialogContentComponent,
  ],
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
  providers: [AddUserService],
})
export class ChatPageModule {}
