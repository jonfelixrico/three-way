import { NgModule, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  GuardResult,
  RouterModule,
  Routes,
} from '@angular/router'
import { ChatPageComponent } from './chat-page.component'
import { ChatService } from '@/chat-services/chat.service'
import { MessageService } from '@/chat-services/message.service'

const routes: Routes = [
  {
    path: '',
    component: ChatPageComponent,
    canActivate: [
      async (route: ActivatedRouteSnapshot): Promise<GuardResult> => {
        const chatSvc = inject(ChatService)
        const messageSvc = inject(MessageService)

        const chatId = route.paramMap.get('chatId')!

        await Promise.all([
          chatSvc.loadChatIntoState(chatId),
          messageSvc.loadMessagesToState(chatId),
        ])

        return true
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
