import { ChatMessage } from './chat-rest-api.types'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ChatActions {
  export class Add {
    static readonly type = '[Chat] Add'
    constructor(public messages: ChatMessage[]) {}
  }
}
