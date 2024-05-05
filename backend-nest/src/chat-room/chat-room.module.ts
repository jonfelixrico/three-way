import { Module } from '@nestjs/common'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import {
  CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
  CHAT_ROOM_REPOSITORY_PROVIDER,
} from 'src/chat-room/chat-room.constants'
import { DatasourceModule } from 'src/datasource/datasource.module'
import type { DataSource } from 'typeorm'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { ChatRoomController } from './chat-room.controller/chat-room.controller'
import { ChatRoomService } from './chat-room.service/chat-room.service'
import { DATASOURCE_PROVIDER } from 'src/datasource/datasource.constants'
import { WebsocketModule } from 'src/websocket/websocket.module'

@Module({
  imports: [DatasourceModule, WebsocketModule],
  providers: [
    {
      provide: CHAT_ROOM_REPOSITORY_PROVIDER,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ChatRoom),
      inject: [DATASOURCE_PROVIDER],
    },
    {
      provide: CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ChatRoomMessage),
      inject: [DATASOURCE_PROVIDER],
    },
    ChatRoomService,
  ],
  controllers: [ChatRoomController],
})
export class ChatRoomModule {}
