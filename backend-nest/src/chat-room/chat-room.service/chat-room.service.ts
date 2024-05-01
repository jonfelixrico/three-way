import { Inject, Injectable } from '@nestjs/common'
import {
  CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
  CHAT_ROOM_REPOSITORY_PROVIDER,
} from 'src/chat-room/chat-room.constants'
import {
  IChatRoom,
  IChatRoomMessage,
} from 'src/chat-room/entity/chat-room-entity.types'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ChatRoomService {
  constructor(
    @Inject(CHAT_ROOM_REPOSITORY_PROVIDER)
    private roomRepo: Repository<ChatRoom>,

    @Inject(CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER)
    private messageRepo: Repository<ChatRoomMessage>
  ) {}

  async sendMessage({
    chatId,
    message,
  }: {
    chatId: string
    message: string
  }): Promise<IChatRoomMessage> {
    return await this.messageRepo.save({
      content: message,
      chatRoom: {
        id: chatId,
      },
      timestamp: new Date(),
    })
  }

  async getMessages({
    chatId,
  }: {
    chatId: string
  }): Promise<IChatRoomMessage[]> {
    return await this.messageRepo.find({
      where: {
        chatRoom: {
          id: chatId,
        },
      },
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getChatRoomById(id: string): Promise<IChatRoom> {
    /*
     * TODO create an actual implementation for this
     * for now this just finds the atomic chat room for the entire app
     * this is to keep implementation simple
     */

    if ((await this.roomRepo.count()) > 0) {
      return await this.roomRepo.findOne({
        where: {
          name: 'GLOBAL',
        },
      })
    }

    // this should be executed only once we want to have a single chat room for the entire app
    return await this.roomRepo.save({
      name: 'GLOBAL',
    })
  }
}
