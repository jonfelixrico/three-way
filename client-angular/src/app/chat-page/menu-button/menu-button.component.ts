import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrl: './menu-button.component.scss',
})
export class MenuButtonComponent {
  items: MenuItem[] = [
    {
      // TODO add i18n
      label: 'Add User',
      icon: 'pi pi-user-plus',
    },
  ]
}
