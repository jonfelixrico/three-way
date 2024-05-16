import { NgModule, inject } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatComponent } from './chat/chat.component'
import { ChatLayoutComponent } from '@/chat-page/chat-layout/chat-layout.component'
import { RealtimeService } from '@/realtime/realtime.service'
import { RealtimeModule } from '@/realtime/realtime.module'

const routes: Routes = [
  {
    path: '',
    component: ChatLayoutComponent,
    children: [
      {
        path: ':chatId',
        component: ChatComponent,
      },
    ],

    resolve: async () => {
      const realtime = inject(RealtimeService)
      await realtime.connect()
    },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes), RealtimeModule],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
