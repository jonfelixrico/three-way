import { Module } from '@nestjs/common'
import { UserService } from './user/user.service'
import { UserAuthService } from './user-auth/user-auth.service'

@Module({
  providers: [UserService, UserAuthService],
})
export class UserModule {}
