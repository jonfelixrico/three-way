import { User } from '@/user/user.types'
import { Component, Signal, computed, signal } from '@angular/core'
import { DynamicDialogRef } from 'primeng/dynamicdialog'

@Component({
  selector: 'app-add-user-dialog-content',
  templateUrl: './add-user-dialog-content.component.html',
  styleUrl: './add-user-dialog-content.component.scss',
})
export class AddUserDialogContentComponent {
  searchTerm: string = ''
  searchResults: User[] = []

  toAdd: Signal<User[]> = signal([])
  alreadyAdded = computed(() => new Set(this.toAdd().map(({ id }) => id)))

  constructor(private ref: DynamicDialogRef) {}

  submit() {
    this.ref.close({ userIds: this.toAdd().map(({ id }) => id) })
  }
}
