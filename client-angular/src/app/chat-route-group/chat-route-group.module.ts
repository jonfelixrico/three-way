import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ChatRouteGroupRoutingModule } from './chat-route-group-routing.module'
import { ChatRouteGroupComponent } from './chat-route-group.component'

@NgModule({
  declarations: [ChatRouteGroupComponent],
  imports: [CommonModule, ChatRouteGroupRoutingModule],
})
export class ChatRouteGroupModule {}
