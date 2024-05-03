import { NgModule, inject } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatComponent } from './chat.component'
import { MessageService } from '../chat-services/message.service'
import { ChatServicesModule } from '../chat-services/chat-services.module'

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
  imports: [RouterModule.forChild(routes), ChatServicesModule],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
