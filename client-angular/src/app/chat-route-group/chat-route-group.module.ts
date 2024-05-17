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

@NgModule({
  declarations: [
    ChatRouteGroupComponent,
    ChatListComponent,
    EmptyPageComponent,
  ],
  imports: [
    CommonModule,
    ChatRouteGroupRoutingModule,
    ButtonModule,
    DividerModule,
    TranslocoModule,
    ChatServicesModule,
  ],
})
export class ChatRouteGroupModule {}
