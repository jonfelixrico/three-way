import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MessageService } from './message.service'
import { ChatService } from '@/chat-services/chat.service'

@NgModule({
  providers: [MessageService, ChatService],
  imports: [CommonModule],
})
export class ChatServicesModule {}
