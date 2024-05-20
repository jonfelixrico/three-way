import { UserService } from '@/user/user.service'
import { User } from '@/user/user.types'
import {
  Component,
  OnDestroy,
  WritableSignal,
  computed,
  signal,
} from '@angular/core'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { BehaviorSubject, Subscription, debounceTime, switchMap } from 'rxjs'

@Component({
  selector: 'app-add-user-dialog-content',
  templateUrl: './add-user-dialog-content.component.html',
  styleUrl: './add-user-dialog-content.component.scss',
})
export class AddUserDialogContentComponent implements OnDestroy {
  searchTerm$ = new BehaviorSubject('')
  get searchTerm() {
    return this.searchTerm$.value
  }
  set searchTerm(value: string) {
    this.searchTerm$.next(value)
  }

  searchResults: User[] = []
  private searchSub: Subscription

  toAdd: WritableSignal<User[]> = signal([])
  alreadyAdded = computed(() => new Set(this.toAdd().map(({ id }) => id)))

  constructor(
    private ref: DynamicDialogRef,
    userSvc: UserService
  ) {
    this.searchSub = this.searchTerm$
      .pipe(
        debounceTime(500),
        switchMap((username) => userSvc.listByUsername$(username))
      )
      .subscribe((users: User[]) => {
        this.searchResults = users
      })
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe()
  }

  submit() {
    this.ref.close({ userIds: this.toAdd().map(({ id }) => id) })
  }

  removeUser(userId: string) {
    this.toAdd.update((userList) => userList.filter(({ id }) => id !== userId))
  }

  addUser(user: User) {
    this.toAdd.update((userList) => [...userList, user])
  }
}
