import { Module } from '@nestjs/common'
import { DatasourceModule } from './datasource/datasource.module'
import { ChatRoomModule } from './chat-room/chat-room.module'
import { WebsocketModule } from './websocket/websocket.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { RegisterModule } from './register/register.module'

@Module({
  imports: [
    DatasourceModule,
    ChatRoomModule,
    WebsocketModule,
    UserModule,
    AuthModule,
    RegisterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
