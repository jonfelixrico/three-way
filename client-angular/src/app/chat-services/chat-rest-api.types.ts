export interface ChatMessage {
  content: string
  id: string
  timestamp: Date
  senderId: string
  chatRoomId: string
}

export interface Chat {
  id: string
  name: string

  members: ChatMember[]
}

export interface ChatMember {
  id: string
  name: string
}

export type SliceChat = Chat & {
  status: 'HYDRATED' | 'PARTIAL'
}
