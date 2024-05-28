import { IChatRoom } from 'src/chat-room/chat-room.types'
import { IUser } from 'src/user/user.types'

export class ChatRoomDto implements IChatRoom {
  id: string
  name: string

  members: IUser[]
}

export class PartialChatRoomDto implements IChatRoom {
  id: string
  name: string
}
