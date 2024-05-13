import { Inject, Injectable } from '@nestjs/common'
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

  async getGlobalRoom(): Promise<IChatRoom> {
    /*
     * TODO create an actual implementation for this
     * for now this just finds the atomic chat room for the entire app
     * this is to keep implementation simple
     */

    const room = await this.roomRepo.findOne({
      where: {
        id: 'global',
      },
    })
    if (room) {
      return room
    }

    // this should be executed only once we want to have a single chat room for the entire app
    return await this.roomRepo.save({
      name: 'global',
      id: 'global',
    })
  }
}
