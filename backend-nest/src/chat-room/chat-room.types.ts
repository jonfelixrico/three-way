export interface IChatRoom {
  id: string
  name: string
}

export interface IChatRoomMessage {
  id: string
  chatId: string
  content: string
}
