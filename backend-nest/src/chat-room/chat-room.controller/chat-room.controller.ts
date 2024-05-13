import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ChatRoomMessageService } from 'src/chat-room/chat-room-message.service/chat-room-message.service'
import { ChatRoomService } from 'src/chat-room/chat-room.service/chat-room.service'
import { UserId } from 'src/decorators/user-id.param-decorator'

@Controller('chat')
export class ChatRoomController {
  constructor(
    private chatSvc: ChatRoomService,
    private msgSvc: ChatRoomMessageService
  ) {}

  @Get('global')
  async getChat() {
    return await this.chatSvc.getGlobal()
  }

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
}
