import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { instanceToPlain } from 'class-transformer'
import { IChatRoomMessage } from 'src/chat-room/chat-room.types'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import { WebsocketDispatcherService } from 'src/websocket/websocket-dispatcher/websocket-dispatcher.service'
import { Repository } from 'typeorm'

@Injectable()
export class ChatRoomMessageService {
  constructor(
    @InjectRepository(ChatRoomMessage)
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
    // Can't use save directly since it wil render instanceToPlain useless.
    // Save seems to return a plain object rather than the entity class.
    const model = this.messageRepo.create({
      content: message,
      chatRoom: {
        id: chatId,
      },
      sender: {
        id: senderId,
      },
      timestamp: new Date(),
    })
    const sent = await this.messageRepo.save(model)

    this.dispatcher.dispatch('MESSAGE_SENT', sent, (id) => id !== senderId)

    return instanceToPlain(sent) as IChatRoomMessage
  }

  async getMessages({
    chatId,
  }: {
    chatId: string
  }): Promise<IChatRoomMessage[]> {
    const messages = await this.messageRepo.find({
      where: {
        chatRoom: {
          id: chatId,
        },
      },
      order: {
        timestamp: 'DESC',
      },
    })

    return messages.map(
      (message) =>
        instanceToPlain<IChatRoomMessage>(message) as IChatRoomMessage
    )
  }
}
