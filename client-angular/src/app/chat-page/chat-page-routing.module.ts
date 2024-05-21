import { NgModule, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  GuardResult,
  RouterModule,
  Routes,
} from '@angular/router'
import { ChatPageComponent } from './chat-page.component'
import { Store } from '@ngxs/store'
import { ChatSliceModel } from '@/chat-services/chat.slice'
import { ChatService } from '@/chat-services/chat.service'
import { MessageService } from '@/chat-services/message.service'

const routes: Routes = [
  {
    path: '',
    component: ChatPageComponent,
    canActivate: [
      async (route: ActivatedRouteSnapshot): Promise<GuardResult> => {
        const store = inject(Store)
        const chatSvc = inject(ChatService)
        const messageSvc = inject(MessageService)

        const chatId = route.paramMap.get('chatId')!

        const chatState = store.selectSnapshot(
          ({ chat }: { chat: ChatSliceModel }) => chat
        )

        const chat = chatState.chats[chatId]
        if (chat?.status !== 'HYDRATED') {
          await chatSvc.loadChatIntoState(chatId)
        }

        const messages = chatState.chatHistories[chatId]
        if (!messages) {
          await messageSvc.loadMessagesToState(chatId)
        }

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
