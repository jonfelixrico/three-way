import { Module } from '@nestjs/common'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import {
  CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
  CHAT_ROOM_REPOSITORY_PROVIDER,
} from 'src/chat-room/chat-room.constants'
import { DatasourceModule } from 'src/datasource/datasource.module'
import type { DataSource } from 'typeorm'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'

@Module({
  imports: [DatasourceModule],
  providers: [
    {
      provide: CHAT_ROOM_REPOSITORY_PROVIDER,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ChatRoom),
    },
    {
      provide: CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(ChatRoomMessage),
    },
  ],
})
export class ChatRoomModule {}
