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
  usersToAdd!: User[]

  @Output()
  usersToAddChange = new EventEmitter<User[]>()

  get addedIds() {
    return new Set<string>(this.usersToAdd.map(({ id }) => id))
  }

  add(addedUser: User) {
    this.usersToAddChange.emit([...this.usersToAdd, addedUser])
  }

  remove(toRemoveId: string) {
    this.usersToAddChange.emit(
      this.usersToAdd.filter((added) => added.id !== toRemoveId)
    )
  }
}
