import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AxiosModule } from '../axios/axios.module'
import { MessageService } from './message.service'

@NgModule({
  providers: [MessageService],
  imports: [CommonModule, AxiosModule],
})
export class ChatRestApiModule {}
