import { Module } from '@nestjs/common'
import { UserService } from './user/user.service'
import { UserAuthService } from './user-auth/user-auth.service'
import { provideUserDb } from 'src/user/user-db.providers'

@Module({
  providers: [UserService, UserAuthService, provideUserDb()],
})
export class UserModule {}
