import { IdentityService } from '@/user/identity.service'
import { Component } from '@angular/core'

@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
})
export class ChatLayoutComponent {
  constructor(private identitySvc: IdentityService) {}

  get username() {
    return this.identitySvc.user?.username
  }

  logOut() {
    return this.identitySvc.clearAccessToken()
  }
}
