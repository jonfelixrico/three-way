import { Module } from '@nestjs/common'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import { DatasourceModule } from 'src/datasource/datasource.module'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { ChatRoomController } from './chat-room.controller/chat-room.controller'
import { ChatRoomService } from './chat-room.service/chat-room.service'
import { WebsocketModule } from 'src/websocket/websocket.module'
import { ChatRoomMessageService } from './chat-room-message.service/chat-room-message.service'
import { ChatRoomMember } from 'src/chat-room/entity/chat-room-member.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [
    DatasourceModule,
    WebsocketModule,
    TypeOrmModule.forFeature([ChatRoom, ChatRoomMessage, ChatRoomMember]),
    UserModule,
  ],
  providers: [ChatRoomService, ChatRoomMessageService],
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
