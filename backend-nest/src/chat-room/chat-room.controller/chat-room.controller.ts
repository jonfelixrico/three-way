import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { ChatRoomMessageService } from 'src/chat-room/chat-room-message.service/chat-room-message.service'
import {
  ChatRoomDto,
  PartialChatRoomDto,
} from 'src/chat-room/chat-room.controller/chat-room.dtos'
import { ChatRoomService } from 'src/chat-room/chat-room.service/chat-room.service'
import { UserId } from 'src/decorators/user-id.param-decorator'
import { WebsocketDispatcherService } from 'src/websocket/websocket-dispatcher/websocket-dispatcher.service'

@Controller('chat')
export class ChatRoomController {
  constructor(
    private chatSvc: ChatRoomService,
    private msgSvc: ChatRoomMessageService,
    private dispatcher: WebsocketDispatcherService
  ) {}

  @Get(':id/message')
  async getMessages(@Param('id') chatId: string, @UserId() userId: string) {
    if (!(await this.chatSvc.checkUserMembership(chatId, userId))) {
      throw new HttpException('Not a member', HttpStatus.FORBIDDEN)
    }

    return await this.msgSvc.getMessages({
      chatId,
    })
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

    return sent
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
      'CHAT_ADD_USER',
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
    return await this.chatSvc.listByUser(userId)
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
    return {
      ...chat,
      members: await this.chatSvc.listMembers(chatId),
    }
  }
}
