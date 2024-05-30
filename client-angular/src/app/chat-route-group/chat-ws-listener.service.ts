import { ChatService } from '@/chat-services/chat.service'
import { RealtimeService } from '@/realtime/realtime.service'
import { Injectable } from '@angular/core'
import { filter, map } from 'rxjs'

@Injectable()
export class ChatWsListenerService {
  constructor(
    private chatSvc: ChatService,
    private realtimeSvc: RealtimeService
  ) {}

  private hasStarted = false

  start() {
    if (this.hasStarted) {
      return
    }

    console.debug('Started listening for chat WS events')

    // No need to unsubscribe on destroy since we don't expect this service to be destroyed once loaded.
    this.realtimeSvc
      .getEvents$<{
        CHAT_USER_ADDED?: {
          chatRoomId: string
        }
      }>()
      .pipe(
        filter((e) => !!e),
        map((value) => value.CHAT_USER_ADDED!)
      )
      .subscribe(async ({ chatRoomId }) => {
        await this.chatSvc.loadChatIntoState(chatRoomId, {
          force: true,
        })
        console.log('Loaded %s data because of CHAT_USER_ADDED', chatRoomId)
      })

    this.hasStarted = true
  }
}
