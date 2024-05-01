export interface IChatroom {
  id: string
  name: string
}

export interface IChatroomMessage {
  id: string
  chatId: string
  content: string
}
