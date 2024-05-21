import { User } from '@/user/user.types'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-add-user-search-list',
  templateUrl: './add-user-search-list.component.html',
  styleUrl: './add-user-search-list.component.scss',
})
export class AddUserSearchListComponent {
  @Input({
    required: true,
  })
  listContent!: User[]

  @Input({ required: true })
  addedUsers!: User[]

  @Output()
  addedUsersChange = new EventEmitter<User[]>()

  get addedIds() {
    return new Set<string>(this.addedUsers.map(({ id }) => id))
  }

  add(addedUser: User) {
    this.addedUsersChange.emit([...this.addedUsers, addedUser])
  }

  remove(toRemoveId: string) {
    this.addedUsersChange.emit(
      this.addedUsers.filter((added) => added.id !== toRemoveId)
    )
  }
}
