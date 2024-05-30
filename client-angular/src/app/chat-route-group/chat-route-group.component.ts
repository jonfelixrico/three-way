import { CreateChatService } from '@/chat-route-group/service.create-chat/create-chat.service'
import { RealtimeService } from '@/realtime/realtime.service'
import { IdentityService } from '@/user/identity.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-chat-route-group',
  templateUrl: './chat-route-group.component.html',
  styleUrl: './chat-route-group.component.scss',
})
export class ChatRouteGroupComponent {
  constructor(
    private identitySvc: IdentityService,
    private router: Router,
    private realtimeSvc: RealtimeService,
    private createSvc: CreateChatService
  ) {}

  get username() {
    return this.identitySvc.user?.username
  }

  logOut() {
    // TODO improve UX by adding a confirmation
    this.identitySvc.clearSession()
    this.router.navigateByUrl('/login')
    this.realtimeSvc.disconnect()
  }

  openCreateDialog() {
    return this.createSvc.openCreateDialog()
  }
}
