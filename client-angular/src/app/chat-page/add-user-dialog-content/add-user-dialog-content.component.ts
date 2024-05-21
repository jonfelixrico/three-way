import { UserService } from '@/user/user.service'
import { User } from '@/user/user.types'
import { Component, OnDestroy, WritableSignal, signal } from '@angular/core'
import { toObservable } from '@angular/core/rxjs-interop'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { Subscription, debounceTime, switchMap } from 'rxjs'

@Component({
  selector: 'app-add-user-dialog-content',
  templateUrl: './add-user-dialog-content.component.html',
  styleUrl: './add-user-dialog-content.component.scss',
})
export class AddUserDialogContentComponent implements OnDestroy {
  searchTerm: WritableSignal<string> = signal('')

  searchResults: User[] = []
  private searchSub: Subscription

  addedUsers: WritableSignal<User[]> = signal([])

  constructor(
    private ref: DynamicDialogRef,
    userSvc: UserService
  ) {
    this.searchSub = toObservable(this.searchTerm)
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
    this.ref.close({ userIds: this.addedUsers().map(({ id }) => id) })
  }
}
