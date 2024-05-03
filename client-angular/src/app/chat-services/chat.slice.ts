import { Injectable } from '@angular/core'
import { State, Action, StateContext } from '@ngxs/store'
import { ChatMessage } from './chat-rest-api.types'
import { ChatActions } from './chat.actions'
import { produce } from 'immer'

interface Chat {
  messages: ChatMessage[]
}

export interface ChatSliceModel {
  chats: {
    [chatId: string]: Chat
  }
}

@State<ChatSliceModel>({
  name: 'chat',
  defaults: {
    chats: {},
  },
})
@Injectable()
export class ChatSlice {
  @Action(ChatActions.Add)
  addMessage(ctx: StateContext<ChatSliceModel>, { messages }: ChatActions.Add) {
    ctx.setState(
      produce((draft) => {
        for (const message of messages) {
          let chat = draft.chats[message.chatRoomId]
          if (!chat) {
            chat = {
              messages: [],
            }

            draft.chats[message.chatRoomId] = chat
          }

          chat.messages.push(...messages)
        }
      })
    )
  }
}
