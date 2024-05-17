import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChatRouteGroupComponent } from './chat-route-group.component'

const routes: Routes = [{ path: '', component: ChatRouteGroupComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRouteGroupRoutingModule {}
