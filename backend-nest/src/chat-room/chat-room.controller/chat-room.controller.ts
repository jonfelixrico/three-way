import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common'
import { ChatRoomService } from 'src/chat-room/chat-room.service/chat-room.service'
import { IUser } from 'src/user/user.types'

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
    @Request() { user }: { user: IUser }
  ) {
    return await this.chatSvc.sendMessage({
      chatId: id,
      content,
      senderId: user.id,
    })
  }
}
