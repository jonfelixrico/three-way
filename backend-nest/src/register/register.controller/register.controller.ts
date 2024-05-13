import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
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

  @Public()
  @Get()
  async checkUsername(@Query('username') username: string) {
    if (!username) {
      throw new HttpException('No username provided', HttpStatus.BAD_REQUEST)
    }

    return {
      taken: !!(await this.userSvc.getByUsername(username)),
    }
  }
}
