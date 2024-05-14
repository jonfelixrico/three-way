import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { instanceToPlain } from 'class-transformer'
import { IChatRoom } from 'src/chat-room/chat-room.types'
import { ChatRoomMember } from 'src/chat-room/entity/chat-room-member.entity'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { IUser } from 'src/user/user.types'
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

  async getById(chatId: string): Promise<IChatRoom> {
    const room = await this.roomRepo.findOne({
      where: { id: chatId },
    })

    return instanceToPlain(room) as IChatRoom
  }

  async listMembers(chatId: string): Promise<IUser[]> {
    const members = await this.memberRepo.find({
      where: {
        chat: {
          id: chatId,
        },
      },
    })

    return members.map(({ user }) => instanceToPlain(user) as IUser)
  }

  async getMemberPermissions(chatId: string, userId: string) {
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

    if (!member) {
      return
    }

    return {
      addMember: member.isOwner,
    }
  }

  async checkUserMembership(chatId: string, userId: string): Promise<boolean> {
    return !!(await this.getMemberPermissions(chatId, userId))
  }

  async listByUser(userId: string): Promise<IChatRoom[]> {
    const userChats = await this.memberRepo.find({
      where: {
        user: {
          id: userId,
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

      isOwner: true,
    })

    return instanceToPlain(newChat) as IChatRoom
  }

  async addMember({
    userId,
    chatId,
  }: {
    userId: string
    chatId: string
  }): Promise<void> {
    if (await this.checkUserMembership(chatId, userId)) {
      throw new Error('User is already a member')
    }

    await this.memberRepo.save({
      chat: {
        id: chatId,
      },

      user: {
        id: userId,
      },

      isOwner: false,
    })
  }
}
