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

@Controller('chat')
export class ChatRoomController {
  constructor(
    private chatSvc: ChatRoomService,
    private msgSvc: ChatRoomMessageService
  ) {}

  @Get(':id/message')
  async getMessages(@Param('id') id: string) {
    return await this.msgSvc.getMessages({
      chatId: id,
    })
  }

  @Post(':id/message')
  async sendMessage(
    @Param('id') id: string,
    @Body('content') content: string,
    @UserId() userId: string
  ) {
    return await this.msgSvc.sendMessage({
      chatId: id,
      content,
      senderId: userId,
    })
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
    if (!(await this.chatSvc.checkUserMembership(chatId, userId))) {
      throw new HttpException('Not part of the room', HttpStatus.FORBIDDEN)
    }

    await this.chatSvc.addMember({
      userId: addedUserId,
      chatId,
    })
  }

  @Get()
  async getList(@UserId() userId: string) {
    return await this.getList(userId)
  }
}
