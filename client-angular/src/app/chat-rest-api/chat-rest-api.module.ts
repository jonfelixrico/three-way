import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MessageService } from './message.service'
import { UserModule } from '../user/user.module'

@NgModule({
  providers: [MessageService],
  imports: [CommonModule, UserModule],
})
export class ChatRestApiModule {}
