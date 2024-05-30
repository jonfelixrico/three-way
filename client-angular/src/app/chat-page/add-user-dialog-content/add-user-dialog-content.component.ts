import { ChatSliceModel } from '@/chat-services/chat.slice'
import { UserService } from '@/user/user.service'
import { User } from '@/user/user.types'
import {
  Component,
  OnDestroy,
  WritableSignal,
  computed,
  signal,
} from '@angular/core'
import { toObservable, toSignal } from '@angular/core/rxjs-interop'
import { Select } from '@ngxs/store'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { Observable, Subscription, debounceTime, switchMap } from 'rxjs'

@Component({
  selector: 'app-add-user-dialog-content',
  templateUrl: './add-user-dialog-content.component.html',
  styleUrl: './add-user-dialog-content.component.scss',
})
export class AddUserDialogContentComponent implements OnDestroy {
  searchTerm: WritableSignal<string> = signal('')

  searchResults: User[] = []
  private searchSub: Subscription

  usersToAdd: WritableSignal<User[]> = signal([])

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
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

  private get chatId() {
    return this.config.data!.chatId
  }

  @Select() private chat$!: Observable<ChatSliceModel>
  private chat = toSignal(this.chat$, { requireSync: true })
  existingMemberIds = computed(
    () =>
      new Set(this.chat().chats[this.chatId].members.map((member) => member.id))
  )

  ngOnDestroy(): void {
    this.searchSub.unsubscribe()
  }

  submit() {
    this.ref.close({ userIds: this.usersToAdd().map(({ id }) => id) })
  }
}
