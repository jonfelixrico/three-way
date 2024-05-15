import { Injectable } from '@angular/core'
import { State, Action, StateContext } from '@ngxs/store'
import { ChatMessage } from './chat-rest-api.types'
import { ChatActions } from './chat.actions'
import { produce } from 'immer'

interface ChatHistory {
  messages: ChatMessage[]
}

interface Chat {
  name: string
  users: {
    name: string
    id: string
  }[]
}

export interface ChatSliceModel {
  chatHistories: {
    [chatId: string]: ChatHistory
  }

  chats: {
    [chatId: string]: Chat
  }
}

@State<ChatSliceModel>({
  name: 'chat',
  defaults: {
    chatHistories: {},
    chats: {},
  },
})
@Injectable()
export class ChatSlice {
  @Action(ChatActions.AddMessages)
  addMessage(
    ctx: StateContext<ChatSliceModel>,
    { messages, chatId }: ChatActions.AddMessages
  ) {
    ctx.setState(
      produce((draft) => {
        let chat = draft.chatHistories[chatId]
        if (!chat) {
          chat = {
            messages: [],
          }

          draft.chatHistories[chatId] = chat
        }

        chat.messages.unshift(...messages)
      })
    )
  }
}
