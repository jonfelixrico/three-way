import { AddUserService } from '@/chat-page/service.add-user/add-user.service'
import { Component, Input } from '@angular/core'
import { TranslocoService } from '@jsverse/transloco'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
})
export class MenuButtonComponent {
  @Input({ required: true }) chatId!: string

  items: MenuItem[] = [
    {
      label: this.t.translate('chat.menu.addUser'),
      icon: 'pi pi-user-plus',
      command: () => this.addUserSvc.openDialog(this.chatId),
    },
  ]

  constructor(
    private addUserSvc: AddUserService,
    private t: TranslocoService
  ) {}
}
