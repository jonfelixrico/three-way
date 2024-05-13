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

  async getGlobal(): Promise<IChatRoom> {
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
      return instanceToPlain(room) as IChatRoom
    }

    // this should be executed only once we want to have a single chat room for the entire app

    let created = this.roomRepo.create({
      name: 'global',
      id: 'global',
    })
    // We're not inputting to save directly since doing so will make save yield a plain object. We're using create so that an instance will be instantiated.
    created = await this.roomRepo.save(created)
    return instanceToPlain(created) as IChatRoom
  }
}
