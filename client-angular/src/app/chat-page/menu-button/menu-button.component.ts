import { AddUserService } from '@/chat-page/service.add-user/add-user.service'
import { Component, Input } from '@angular/core'
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
      // TODO add i18n
      label: 'Add User',
      icon: 'pi pi-user-plus',
      command: () => this.addUserSvc.openDialog(this.chatId),
    },
  ]

  constructor(private addUserSvc: AddUserService) {}
}
