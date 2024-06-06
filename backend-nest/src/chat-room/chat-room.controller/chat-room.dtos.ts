import { IChatRoom, IChatRoomMessage } from 'src/chat-room/chat-room.types'
import { IUser } from 'src/user/user.types'

class ChatRoomMessagePreviewDto {
  message: IChatRoomMessage
  sender: {
    name: string
  }
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
