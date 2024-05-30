import { ChatService } from '@/chat-services/chat.service'
import { RealtimeService } from '@/realtime/realtime.service'
import { Injectable } from '@angular/core'
import { filter, map } from 'rxjs'

@Injectable()
export class ChatWsListenerService {
  constructor(chatSvc: ChatService, realtimeSvc: RealtimeService) {
    // No need to unsubscribe on destroy since we don't expect this service to be destroyed once loaded.
    realtimeSvc
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
        await chatSvc.loadChatIntoState(chatRoomId, {
          force: true,
        })
        console.log('Loaded %s data because of CHAT_USER_ADDED', chatRoomId)
      })
  }
}
