import { CreateDialogContentComponent } from '@/chat-route-group/create-dialog-content/create-dialog-content.component'
import { ChatService } from '@/chat-services/chat.service'
import { Injectable } from '@angular/core'
import { TranslocoService } from '@jsverse/transloco'
import { DialogService } from 'primeng/dynamicdialog'

@Injectable()
export class CreateChatService {
  constructor(
    private dialogSvc: DialogService,
    private chatSvc: ChatService,
    private t: TranslocoService
  ) {}

  openCreateDialog() {
    const ref = this.dialogSvc.open(CreateDialogContentComponent, {
      header: this.t.translate('chat.createChatDialog.header'),
    })

    ref.onClose.subscribe((chat: { name: string }) => {
      if (!chat) {
        return
      }

      this.chatSvc.createChat(chat)
    })
  }
}
