import { CreateDialogContentComponent } from '@/chat-route-group/create-dialog-content/create-dialog-content.component'
import { ChatService } from '@/chat-services/chat.service'
import { Injectable } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'

@Injectable()
export class CreateChatService {
  constructor(
    private dialogSvc: DialogService,
    private chatSvc: ChatService
  ) {}

  openCreateDialog() {
    const ref = this.dialogSvc.open(CreateDialogContentComponent, {
      // TODO i18nize
      header: 'Create Dialog',
    })

    ref.onClose.subscribe((chat: { name: string }) => {
      // TODO do something about the chat
    })
  }
}
