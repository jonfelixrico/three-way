import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatComponent } from './chat/chat.component'
import { ChatLayoutComponent } from '@/chat-page/chat-layout/chat-layout.component'

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
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPageRoutingModule {}
