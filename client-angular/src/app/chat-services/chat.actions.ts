import { ChatMessage } from './chat-rest-api.types'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ChatActions {
  export class AddMessages {
    static readonly type = '[Chat] Add Messages'
    constructor(
      public chatId: string,
      public messages: ChatMessage[]
    ) {}
  }
}
