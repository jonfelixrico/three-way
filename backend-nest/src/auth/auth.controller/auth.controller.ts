import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { CredentialsReqDto } from 'src/user/user.dtos'
import { UserService } from 'src/user/user.service/user.service'

@Controller('auth')
export class AuthController {
  constructor(private userSvc: UserService) {}

  @Post()
  async authenticate(@Body() body: CredentialsReqDto) {
    const matchingUser = await this.userSvc.verifyCredentials(
      body.username,
      body.password
    )

    if (!matchingUser) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED)
    }
  }
}
