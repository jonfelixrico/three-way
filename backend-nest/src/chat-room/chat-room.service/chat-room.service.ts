import { Inject, Injectable } from '@nestjs/common'
import {
  CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
  CHAT_ROOM_REPOSITORY_PROVIDER,
} from 'src/chat-room/chat-room.constants'
import { IChatRoom, IChatRoomMessage } from 'src/chat-room/chat-room.types'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { WebsocketDispatcherService } from 'src/websocket/websocket-dispatcher/websocket-dispatcher.service'
import { Repository } from 'typeorm'

@Injectable()
export class ChatRoomService {
  constructor(
    @Inject(CHAT_ROOM_REPOSITORY_PROVIDER)
    private roomRepo: Repository<ChatRoom>,

    @Inject(CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER)
    private messageRepo: Repository<ChatRoomMessage>,

    private dispatcher: WebsocketDispatcherService
  ) {}

  async sendMessage({
    chatId,
    content: message,
    senderId,
  }: {
    chatId: string
    content: string
    senderId: string
  }): Promise<IChatRoomMessage> {
    const sent = await this.messageRepo.save({
      content: message,
      chatRoom: {
        id: chatId,
      },
      sender: {
        id: senderId,
      },
      timestamp: new Date(),
    })

    this.dispatcher.dispatch('MESSAGE_SENT', sent, (id) => id !== senderId)

    return sent
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
      order: {
        timestamp: 'DESC',
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

    const room = await this.roomRepo.findOne({
      where: {
        id,
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
