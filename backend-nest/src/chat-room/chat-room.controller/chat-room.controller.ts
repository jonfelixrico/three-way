import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import {
  ChatRoomMessageService,
  IPreviewMessage,
} from 'src/chat-room/chat-room-message.service/chat-room-message.service'
import {
  ChatRoomDto,
  ChatRoomMessageDto,
  ChatRoomMessagesDto,
  PartialChatRoomDto,
} from 'src/chat-room/chat-room.controller/chat-room.dtos'
import { ChatRoomService } from 'src/chat-room/chat-room.service/chat-room.service'
import { UserId } from 'src/decorators/user-id.param-decorator'
import { UserService } from 'src/user/user.service/user.service'
import { IUser } from 'src/user/user.types'
import { toInstance } from 'src/utils/class-transformer.utils'
import { WebsocketDispatcherService } from 'src/websocket/websocket-dispatcher/websocket-dispatcher.service'

@Controller('chat')
@UseInterceptors(ClassSerializerInterceptor)
export class ChatRoomController {
  constructor(
    private chatSvc: ChatRoomService,
    private msgSvc: ChatRoomMessageService,
    private dispatcher: WebsocketDispatcherService,
    private userSvc: UserService
  ) {}

  @Get(':id/message')
  async getMessages(
    @Param('id') chatId: string,
    @UserId() userId: string
  ): Promise<ChatRoomMessagesDto> {
    if (!(await this.chatSvc.checkUserMembership(chatId, userId))) {
      throw new HttpException('Not a member', HttpStatus.FORBIDDEN)
    }

    const messages = await this.msgSvc.getMessages({
      chatId,
    })

    const uniqueIds = new Set(messages.map((m) => m.senderId))
    const users: IUser[] = []
    for (const id of uniqueIds) {
      users.push(await this.userSvc.getById(id))
    }

    return toInstance(
      ChatRoomMessagesDto,
      {
        messages,
        users,
      },
      {
        excludeExtraneousValues: true,
      }
    )
  }

  @Post(':id/message')
  async sendMessage(
    @Param('id') chatId: string,
    @Body('content') content: string,
    @UserId() userId: string
  ) {
    if (!(await this.chatSvc.checkUserMembership(chatId, userId))) {
      throw new HttpException('Not a member', HttpStatus.FORBIDDEN)
    }

    const sent = await this.msgSvc.sendMessage({
      chatId,
      content,
      senderId: userId,
    })

    // Intended to be ran asynchronously to not block responding
    this.broadcastToRoomWs(
      {
        chatId,
        senderId: userId,
      },
      'MESSAGE_SENT',
      sent
    )

    return toInstance(ChatRoomMessageDto, sent, {
      excludeExtraneousValues: true,
    })
  }

  @Post()
  async createChat(
    @UserId() userId: string,
    @Body('name') name: string
  ): Promise<ChatRoomDto> {
    const chat = await this.chatSvc.create({
      createdBy: userId,
      name,
    })

    return {
      ...chat,
      members: await this.chatSvc.listMembers(chat.id),
      previewMessage: await this.msgSvc.getPreviewMessage({
        chatId: chat.id,
      }),
    }
  }

  private async broadcastToRoomWs(
    {
      chatId,
      senderId,
    }: {
      chatId: string
      senderId: string
    },
    eventName: string,
    payload: unknown
  ) {
    const members = await this.chatSvc.listMembers(chatId)

    const ids = new Set(members.map((m) => m.id))
    this.dispatcher.dispatch(
      eventName,
      payload,
      // The sender is expected to be a member of the room, but we're not relaying back to them to not need a FE handling to ignore self-sent messages from the WS
      (id) => id !== senderId && ids.has(id)
    )
  }

  @Post(':id/user')
  async addUsersToChat(
    @UserId() userId: string,
    @Body('userIds') addedUserIds: string[],
    @Param('id') chatId: string
  ) {
    const rights = await this.chatSvc.getMemberPermissions(chatId, userId)

    if (!rights?.addMember) {
      throw new HttpException('Not part of the room', HttpStatus.FORBIDDEN)
    }

    await this.chatSvc.addMembers({
      userIds: addedUserIds,
      chatId,
    })

    // Intended to be ran asynchronously to not block responding
    this.broadcastToRoomWs(
      {
        chatId,
        senderId: userId,
      },
      'CHAT_USER_ADDED',
      {
        userIds: addedUserIds,
        chatRoomId: chatId,
      }
    )
  }

  @Get(':id/user')
  async getChatUsers(@UserId() userId: string, @Param('id') chatId: string) {
    if (!(await this.chatSvc.checkUserMembership(chatId, userId))) {
      throw new HttpException('Not a member', HttpStatus.FORBIDDEN)
    }

    return await this.chatSvc.listMembers(chatId)
  }

  @Get()
  async getList(@UserId() userId: string): Promise<PartialChatRoomDto[]> {
    const rawChats = await this.chatSvc.listByUser(userId)

    const previewMessages: IPreviewMessage[] = []
    for (const chat of rawChats) {
      previewMessages.push(
        await this.msgSvc.getPreviewMessage({ chatId: chat.id })
      )
    }

    return rawChats.map((chat) =>
      toInstance(PartialChatRoomDto, {
        ...chat,
        previewMessage: previewMessages[chat.id] ?? null,
      })
    )
  }

  @Get(':id')
  async getChat(
    @UserId() userId: string,
    @Param('id') chatId: string
  ): Promise<ChatRoomDto> {
    if (!(await this.chatSvc.checkUserMembership(chatId, userId))) {
      throw new HttpException('Not part of the room', HttpStatus.FORBIDDEN)
    }

    const chat = await this.chatSvc.getById(chatId)

    return toInstance(
      ChatRoomDto,
      {
        ...chat,
        members: await this.chatSvc.listMembers(chatId),
        previewMessage: await this.msgSvc.getPreviewMessage({
          chatId: chat.id,
        }),
      },
      {
        excludeExtraneousValues: true,
      }
    )
  }
}
