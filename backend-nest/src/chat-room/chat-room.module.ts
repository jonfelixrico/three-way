import { Module } from '@nestjs/common'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import {
  CHAT_ROOM_MEMBER_REPOSITORY_PROVIDER,
  CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
  CHAT_ROOM_REPOSITORY_PROVIDER,
} from 'src/chat-room/chat-room.constants'
import { DatasourceModule } from 'src/datasource/datasource.module'
import { DataSource } from 'typeorm'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { ChatRoomController } from './chat-room.controller/chat-room.controller'
import { ChatRoomService } from './chat-room.service/chat-room.service'
import { WebsocketModule } from 'src/websocket/websocket.module'
import { ChatRoomMessageService } from './chat-room-message.service/chat-room-message.service'
import { ChatRoomMember } from 'src/chat-room/entity/chat-room-member.entity'

@Module({
  imports: [DatasourceModule, WebsocketModule],
  providers: [
    {
      provide: CHAT_ROOM_REPOSITORY_PROVIDER,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ChatRoom),
      inject: [DataSource],
    },
    {
      provide: CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ChatRoomMessage),
      inject: [DataSource],
    },
    {
      provide: CHAT_ROOM_MEMBER_REPOSITORY_PROVIDER,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ChatRoomMember),
      inject: [DataSource],
    },

    ChatRoomService,
    ChatRoomMessageService,
  ],
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
