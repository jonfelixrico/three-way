import { Inject, Injectable } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'
import { CHAT_ROOM_REPOSITORY_PROVIDER } from 'src/chat-room/chat-room.constants'
import { IChatRoom } from 'src/chat-room/chat-room.types'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ChatRoomService {
  constructor(
    @Inject(CHAT_ROOM_REPOSITORY_PROVIDER)
    private roomRepo: Repository<ChatRoom>
  ) {}

  async getById(id: string): Promise<IChatRoom> {
    const room = await this.roomRepo.findOne({
      where: { id },
    })

    return instanceToPlain(room) as IChatRoom
  }
}
