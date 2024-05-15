import { Injectable } from '@angular/core'
import { State, Action, StateContext } from '@ngxs/store'
import { ChatMessage } from './chat-rest-api.types'
import { ChatActions } from './chat.actions'
import { produce } from 'immer'

interface ChatMessages {
  messages: ChatMessage[]
}

export interface ChatSliceModel {
  chatMessages: {
    [chatId: string]: ChatMessages
  }
}

@State<ChatSliceModel>({
  name: 'chat',
  defaults: {
    chatMessages: {},
  },
})
@Injectable()
export class ChatSlice {
  @Action(ChatActions.Add)
  addMessage(
    ctx: StateContext<ChatSliceModel>,
    { messages, chatId }: ChatActions.Add
  ) {
    ctx.setState(
      produce((draft) => {
        let chat = draft.chatMessages[chatId]
        if (!chat) {
          chat = {
            messages: [],
          }

          draft.chatMessages[chatId] = chat
        }

        chat.messages.unshift(...messages)
      })
    )
  }
}
