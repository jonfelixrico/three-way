import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { Public } from 'src/auth/public.decorator'
import { CredentialsReqDto } from 'src/user/user.dtos'
import { UserService } from 'src/user/user.service/user.service'

@Controller('register')
export class RegisterController {
  constructor(private userSvc: UserService) {}

  @Public()
  @Post()
  async register(@Body() credentials: CredentialsReqDto): Promise<void> {
    const createdUser = await this.userSvc.create(credentials)

    if (!createdUser) {
      throw new HttpException('Username taken', HttpStatus.CONFLICT)
    }
  }
}
