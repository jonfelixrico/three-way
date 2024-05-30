import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MessageService } from './message.service'
import { ChatService } from '@/chat-services/chat.service'
import { ChatWsListenerService } from '@/chat-services/chat-ws-listener.service'

@NgModule({
  providers: [MessageService, ChatService, ChatWsListenerService],
  imports: [CommonModule],
})
export class ChatServicesModule {}
