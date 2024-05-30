import { Injectable } from '@angular/core'
import { State, Action, StateContext } from '@ngxs/store'
import { ChatMessage, SliceChat } from './chat-rest-api.types'
import { ChatActions } from './chat.actions'
import { produce } from 'immer'

interface ChatHistory {
  messages: ChatMessage[]
  earliestTimestamp: Date
}

export interface ChatSliceModel {
  chatHistories: {
    [chatId: string]: ChatHistory
  }

  chats: {
    [chatId: string]: SliceChat
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
        const history = draft.chatHistories[chatId]
        if (!history) {
          return
        }

        history.messages.unshift(...messages)
      })
    )
  }

  @Action(ChatActions.AddHistoricalMessages)
  addHistoricalMessages(
    ctx: StateContext<ChatSliceModel>,
    { messages, chatId }: ChatActions.AddHistoricalMessages
  ) {
    ctx.setState(
      produce((draft) => {
        let history = draft.chatHistories[chatId]
        if (!history) {
          history = {
            messages: [],
            earliestTimestamp: new Date(),
          }

          draft.chatHistories[chatId] = history
        }

        history.messages.push(...messages)
        history.earliestTimestamp = new Date(
          Math.min(
            history.earliestTimestamp.getTime(),
            ...messages.map((chat) => new Date(chat.timestamp).getTime())
          )
        )
      })
    )
  }

  @Action(ChatActions.Set)
  setChat(ctx: StateContext<ChatSliceModel>, { chat }: ChatActions.Set) {
    ctx.setState(
      produce((draft) => {
        draft.chats[chat.id] = chat
      })
    )
  }
}
