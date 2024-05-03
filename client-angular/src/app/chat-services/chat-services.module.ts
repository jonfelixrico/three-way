import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MessageService } from './message.service'

@NgModule({
  providers: [MessageService],
  imports: [CommonModule],
})
export class ChatServicesModule {}
