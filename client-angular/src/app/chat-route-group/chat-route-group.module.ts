import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ChatRouteGroupRoutingModule } from './chat-route-group-routing.module'
import { ChatRouteGroupComponent } from './chat-route-group.component'
import { ButtonModule } from 'primeng/button'
import { DividerModule } from 'primeng/divider'
import { ChatListComponent } from '@/chat-route-group/chat-list/chat-list.component'
import { TranslocoModule } from '@jsverse/transloco'
import { ChatServicesModule } from '@/chat-services/chat-services.module'
import { EmptyPageComponent } from './empty-page/empty-page.component'
import { CreateDialogContentComponent } from './create-dialog-content/create-dialog-content.component'
import { ReactiveFormsModule } from '@angular/forms'
import { CreateChatService } from '@/chat-route-group/service.create-chat/create-chat.service'
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'
import { InputTextModule } from 'primeng/inputtext'
import { ChatWsListenerService } from '@/chat-route-group/chat-ws-listener.service'

@NgModule({
  declarations: [
    ChatRouteGroupComponent,
    ChatListComponent,
    EmptyPageComponent,
    CreateDialogContentComponent,
  ],
  imports: [
    CommonModule,
    ChatRouteGroupRoutingModule,
    ButtonModule,
    DividerModule,
    TranslocoModule,
    ChatServicesModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    InputTextModule,
  ],
  providers: [CreateChatService, DialogService, ChatWsListenerService],
})
export class ChatRouteGroupModule {}
