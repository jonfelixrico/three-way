import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ChatRoomService } from 'src/chat-room/chat-room.service/chat-room.service'

@Controller('chat')
export class ChatRoomController {
  constructor(private chatSvc: ChatRoomService) {}

  @Get(':id')
  async getChat(@Param('id') id: string) {
    return await this.chatSvc.getChatRoomById(id)
  }

  @Get(':id/message')
  async getMessages(@Param('id') id: string) {
    return await this.chatSvc.getMessages({
      chatId: id,
    })
  }

  @Post(':id/message')
  async sendMessage(
    @Param('id') id: string,
    @Body('content') content: string,
    // TODO get from session/token once implemetned
    @Body('senderId') senderId: string
  ) {
    return await this.chatSvc.sendMessage({
      chatId: id,
      content,
      senderId,
    })
  }
}
