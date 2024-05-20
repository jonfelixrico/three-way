import { User } from '@/user/user.types'
import { Component } from '@angular/core'
import { DynamicDialogRef } from 'primeng/dynamicdialog'

@Component({
  selector: 'app-add-user-dialog-content',
  templateUrl: './add-user-dialog-content.component.html',
  styleUrl: './add-user-dialog-content.component.scss',
})
export class AddUserDialogContentComponent {
  searchTerm: string = ''
  searchResults: User[] = []

  toAdd: User[] = []

  constructor(private ref: DynamicDialogRef) {}

  submit() {
    this.ref.close({ userIds: this.toAdd.map(({ id }) => id) })
  }
}
