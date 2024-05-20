import { AddUserDialogContentComponent } from '@/chat-page/add-user-dialog-content/add-user-dialog-content.component'
import { ChatService } from '@/chat-services/chat.service'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'

@Injectable()
export class AddUserService {
  constructor(
    private dialogSvc: DialogService,
    private chatSvc: ChatService,
    private http: HttpClient
  ) {}

  openDialog(chatId: string) {
    const ref = this.dialogSvc.open(AddUserDialogContentComponent, {
      // TODO i18nize this
      header: 'Add User',
    })

    ref.onClose.subscribe(async (data: { userIds: string[] }) => {
      this.chatSvc.addUserToChat(chatId, data)
    })
  }
}
