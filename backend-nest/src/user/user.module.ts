import { Module } from '@nestjs/common'
import { UserService } from './user.service/user.service'
import { provideUserDb } from 'src/user/user-db.providers'
import { UserController } from './user.controller/user.controller'

@Module({
  providers: [UserService, provideUserDb()],
  controllers: [UserController],
})
export class UserModule {}
