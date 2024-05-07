import { Body, Controller, Post } from '@nestjs/common'
import { CredentialsReqDto } from 'src/user/user.dtos'
import { UserService } from 'src/user/user.service/user.service'

@Controller('register')
export class RegisterController {
  constructor(private userSvc: UserService) {}

  @Post()
  async register(@Body() credentials: CredentialsReqDto): Promise<void> {
    await this.userSvc.create(credentials)
  }
}
