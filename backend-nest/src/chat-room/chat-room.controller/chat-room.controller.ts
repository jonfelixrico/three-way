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

    /*
     * We're doing this asynchronously as to not delay the response to the client further
     */
    this.chatSvc.listMembers(chatId).then((members) => {
      const ids = new Set(members.map((m) => m.id))
      this.dispatcher.dispatch(
        'MESSAGE_SENT',
        sent,
        (id) => id !== userId && ids.has(id)
      )
    })

    return sent
  }

  @Post()
  async createChat(@UserId() userId: string, @Body('name') name: string) {
    return this.chatSvc.create({
      createdBy: userId,
      name,
    })
  }

  @Post(':id/user')
  async addUserToChat(
    @UserId() userId: string,
    @Body('userId') addedUserId: string,
    @Param('id') chatId: string
  ) {
    const rights = await this.chatSvc.getMemberPermissions(chatId, userId)

    if (!rights?.addMember) {
      throw new HttpException('Not part of the room', HttpStatus.FORBIDDEN)
    }

    await this.chatSvc.addMember({
      userId: addedUserId,
      chatId,
    })
  }

  @Get(':id/user')
  async getChatUsers(@UserId() userId: string, @Param('id') chatId: string) {
    if (!(await this.chatSvc.checkUserMembership(chatId, userId))) {
      throw new HttpException('Not a member', HttpStatus.FORBIDDEN)
    }

    return await this.chatSvc.listMembers(chatId)
  }

  @Get()
  async getList(@UserId() userId: string) {
    return await this.chatSvc.listByUser(userId)
  }

  @Get(':id')
  async getChat(@UserId() userId: string, @Param('id') chatId: string) {
    if (!(await this.chatSvc.checkUserMembership(chatId, userId))) {
      throw new HttpException('Not part of the room', HttpStatus.FORBIDDEN)
    }

    return await this.chatSvc.getById(chatId)
  }
}
