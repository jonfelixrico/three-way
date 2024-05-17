import { NgModule, inject } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatRouteGroupComponent } from './chat-route-group.component'
import { RealtimeService } from '@/realtime/realtime.service'
import { RealtimeModule } from '@/realtime/realtime.module'
import { EmptyPageComponent } from '@/chat-route-group/empty-page/empty-page.component'

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
      async () => {
        const realtime = inject(RealtimeService)
        await realtime.connect()
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
