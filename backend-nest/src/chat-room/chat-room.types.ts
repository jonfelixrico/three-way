export interface IChatRoom {
  id: string
  name: string
}

export interface IChatRoomMessage {
  id: string
  chatRoomId: string
  content: string
  timestamp: Date
  senderId: string
}

export interface IChatRoomMember {
  chatId: string
  userId: string

  isOwner: boolean
}
