export interface IChatRoom {
  id: string
  name: string
}

export interface IChatRoomMessage {
  id: string
  chatRoomId: string
  content: string
}
