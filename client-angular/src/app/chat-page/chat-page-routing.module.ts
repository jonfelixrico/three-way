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

const routes: Routes = [
  {
    path: '',
    component: ChatPageComponent,
    canActivate: [
      async (route: ActivatedRouteSnapshot): Promise<GuardResult> => {
        const store = inject(Store)
        const chatSvc = inject(ChatService)

        const chatId = route.paramMap.get('chatId')!
        const chatState = store.selectSnapshot(
          ({ chat }: { chat: ChatSliceModel }) => chat.chats[chatId]
        )

        if (chatState?.status === 'HYDRATED') {
          return true
        }

        await chatSvc.loadChatIntoState(chatId)
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
