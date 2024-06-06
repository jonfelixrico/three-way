import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IChatRoomMessage } from 'src/chat-room/chat-room.types'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ChatRoomMessageService {
  constructor(
    @InjectRepository(ChatRoomMessage)
    private messageRepo: Repository<ChatRoomMessage>
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
      chatRoomId: chatId,
      senderId,
      timestamp: new Date(),
    })
    return await this.messageRepo.save(model)
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
}
