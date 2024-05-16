import { RealtimeService } from '@/realtime/realtime.service'
import { IdentityService } from '@/user/identity.service'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent {
  constructor(
    private identitySvc: IdentityService,
    private router: Router,
    private realtimeSvc: RealtimeService
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
}
