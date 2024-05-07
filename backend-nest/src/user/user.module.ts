import { Module } from '@nestjs/common'
import { UserService } from './user/user.service'
import { provideUserDb } from 'src/user/user-db.providers'

@Module({
  providers: [UserService, provideUserDb()],
})
export class UserModule {}
