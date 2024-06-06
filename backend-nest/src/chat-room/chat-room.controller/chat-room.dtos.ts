import { Expose, Type } from 'class-transformer'
import { IPreviewMessage } from 'src/chat-room/chat-room-message.service/chat-room-message.service'
import { IChatRoom, IChatRoomMessage } from 'src/chat-room/chat-room.types'
import { IUser } from 'src/user/user.types'

class ChatRoomMessagePreviewDto implements IPreviewMessage {
  @Expose()
  id: string

  @Expose()
  chatRoomId: string

  @Expose()
  content: string

  @Expose()
  timestamp: Date

  @Expose()
  senderId: string

  @Expose()
  senderName: string
}

export class ChatRoomDto implements IChatRoom {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  members: IUser[]

  @Type(() => ChatRoomMessagePreviewDto)
  @Expose()
  previewMessage: ChatRoomMessagePreviewDto | null
}

export class PartialChatRoomDto implements IChatRoom {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  @Type(() => ChatRoomMessagePreviewDto)
  previewMessage: ChatRoomMessagePreviewDto | null
}

export class ChatRoomMessagesDto {
  messages: IChatRoomMessage[]

  users: {
    id: string
    name: string
  }[]
}
