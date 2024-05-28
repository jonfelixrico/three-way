import { AddUserDialogContentComponent } from '@/chat-page/add-user-dialog-content/add-user-dialog-content.component'
import { ChatService } from '@/chat-services/chat.service'
import { Injectable } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'

@Injectable()
export class AddUserService {
  constructor(
    private dialogSvc: DialogService,
    private chatSvc: ChatService
  ) {}

  openDialog(chatId: string) {
    const ref = this.dialogSvc.open(AddUserDialogContentComponent, {
      header: 'Add User',
      height: '70vh',
      width: '50vw',
      data: {
        chatId,
      },
    })

    ref.onClose.subscribe(async (data: { userIds: string[] }) => {
      this.chatSvc.addUserToChat(chatId, data)
    })
  }
}
