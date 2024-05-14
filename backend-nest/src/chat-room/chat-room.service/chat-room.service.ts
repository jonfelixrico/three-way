import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { instanceToPlain } from 'class-transformer'
import { IChatRoom } from 'src/chat-room/chat-room.types'
import { ChatRoomMember } from 'src/chat-room/entity/chat-room-member.entity'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { Repository } from 'typeorm'
import { Transactional } from 'typeorm-transactional'

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private roomRepo: Repository<ChatRoom>,

    @InjectRepository(ChatRoomMember)
    private memberRepo: Repository<ChatRoomMember>
  ) {}

  async getById(id: string): Promise<IChatRoom> {
    const room = await this.roomRepo.findOne({
      where: { id },
    })

    return instanceToPlain(room) as IChatRoom
  }

  async checkUserMembership(chatId: string, userId: string): Promise<boolean> {
    const member = await this.memberRepo.findOne({
      where: {
        chat: {
          id: chatId,
        },

        user: {
          id: userId,
        },
      },
    })

    return !!member
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

  @Transactional()
  async create({
    name,
    createdBy,
  }: {
    name: string
    createdBy: string
  }): Promise<IChatRoom> {
    let newChat = this.roomRepo.create({
      name,
    })
    newChat = await this.roomRepo.save(newChat)

    await this.memberRepo.save({
      chat: {
        id: newChat.id,
      },

      user: {
        id: createdBy,
      },
    })

    return instanceToPlain(newChat) as IChatRoom
  }
}
