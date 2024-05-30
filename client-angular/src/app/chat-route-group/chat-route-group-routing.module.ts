import { NgModule, inject } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatRouteGroupComponent } from './chat-route-group.component'
import { RealtimeService } from '@/realtime/realtime.service'
import { RealtimeModule } from '@/realtime/realtime.module'
import { EmptyPageComponent } from '@/chat-route-group/empty-page/empty-page.component'
import { ChatService } from '@/chat-services/chat.service'
import { ChatWsListenerService } from '@/chat-route-group/chat-ws-listener.service'

const routes: Routes = [
  {
    path: '',
    component: ChatRouteGroupComponent,
    children: [
      {
        path: '',
        component: EmptyPageComponent,
      },
      {
        path: ':chatId',
        loadChildren: () =>
          import('@/chat-page/chat-page.module').then((m) => m.ChatPageModule),
      },
    ],

    // TODO check if there's a more appropriate way to do this
    canActivate: [
      () => {
        inject(ChatWsListenerService).start()
        return true
      },

      async () => {
        const realtime = inject(RealtimeService)
        const chatSvc = inject(ChatService)

        await Promise.all([chatSvc.loadListIntoState(), realtime.connect()])
        return true
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes), RealtimeModule],
  exports: [RouterModule],
})
export class ChatRouteGroupRoutingModule {}
