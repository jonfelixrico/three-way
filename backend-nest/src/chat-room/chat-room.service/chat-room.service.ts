import { Inject, Injectable } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import {
  CHAT_ROOM_MEMBER_REPOSITORY_PROVIDER,
  CHAT_ROOM_REPOSITORY_PROVIDER,
} from 'src/chat-room/chat-room.constants'
import { IChatRoom } from 'src/chat-room/chat-room.types'
import { ChatRoomMember } from 'src/chat-room/entity/chat-room-member.entity'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ChatRoomService {
  constructor(
    @Inject(CHAT_ROOM_REPOSITORY_PROVIDER)
    private roomRepo: Repository<ChatRoom>,

    @Inject(CHAT_ROOM_MEMBER_REPOSITORY_PROVIDER)
    private memberRepo: Repository<ChatRoomMember>
  ) {}

  async getById(id: string): Promise<IChatRoom> {
    const room = await this.roomRepo.findOne({
      where: { id },
    })

    return instanceToPlain(room) as IChatRoom
  }

  async listByUser(id: string): Promise<IChatRoom[]> {
    const userChats = await this.memberRepo.find({
      where: {
        user: {
          id,
        },
      },
    })

    return userChats.map(({ chat }) => instanceToPlain(chat) as IChatRoom)
  }
}
