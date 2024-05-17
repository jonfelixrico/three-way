import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ChatRouteGroupRoutingModule } from './chat-route-group-routing.module'
import { ChatRouteGroupComponent } from './chat-route-group.component'
import { ButtonModule } from 'primeng/button'
import { DividerModule } from 'primeng/divider'
import { ChatListComponent } from '@/chat-route-group/chat-list/chat-list.component'

@NgModule({
  declarations: [ChatRouteGroupComponent, ChatListComponent],
  imports: [
    CommonModule,
    ChatRouteGroupRoutingModule,
    ButtonModule,
    DividerModule,
  ],
})
export class ChatRouteGroupModule {}
