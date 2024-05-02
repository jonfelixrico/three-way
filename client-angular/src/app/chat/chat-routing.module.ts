import { NgModule, inject } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatComponent } from './chat.component'
import { MessageService } from '../chat-rest-api/message.service'
import { ChatRestApiModule } from '../chat-rest-api/chat-rest-api.module'

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    resolve: {
      messages: () => {
        return inject(MessageService)!.getMessages('global')
      },
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes), ChatRestApiModule],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
