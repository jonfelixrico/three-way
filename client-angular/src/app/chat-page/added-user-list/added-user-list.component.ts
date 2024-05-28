import { User } from '@/user/user.types'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-added-user-list',
  templateUrl: './added-user-list.component.html',
  styleUrl: './added-user-list.component.scss',
})
export class AddedUserListComponent {
  @Input({ required: true })
  usersToAdd!: User[]

  @Output()
  usersToAddChange = new EventEmitter<User[]>()

  remove(toRemoveId: string) {
    this.usersToAddChange.emit(
      this.usersToAdd.filter((user) => user.id !== toRemoveId)
    )
  }
}
