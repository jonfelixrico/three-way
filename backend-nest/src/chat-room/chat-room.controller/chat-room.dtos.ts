import { IPreviewMessage } from 'src/chat-room/chat-room-message.service/chat-room-message.service'
import { IChatRoom, IChatRoomMessage } from 'src/chat-room/chat-room.types'
import { IUser } from 'src/user/user.types'

class ChatRoomMessagePreviewDto implements IPreviewMessage {
  id: string
  chatRoomId: string
  content: string
  timestamp: Date
  senderId: string
  senderName: string
}

export class ChatRoomDto implements IChatRoom {
  id: string
  name: string

  members: IUser[]

  previewMessage: ChatRoomMessagePreviewDto | null
}

export class PartialChatRoomDto implements IChatRoom {
  id: string
  name: string

  previewMessage: ChatRoomMessagePreviewDto | null
}

export class ChatRoomMessagesDto {
  messages: IChatRoomMessage[]

  users: {
    id: string
    name: string
  }[]
}
