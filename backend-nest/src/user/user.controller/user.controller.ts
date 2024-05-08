import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { CredentialsReqDto, UserRespDto } from 'src/user/user.dtos'
import { UserService } from 'src/user/user.service/user.service'

@Controller('user')
export class UserController {
  constructor(private svc: UserService) {}

  @Post()
  async create(@Body() body: CredentialsReqDto): Promise<UserRespDto> {
    return await this.svc.create(body)
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserRespDto> {
    const user = await this.svc.getById(id)

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
    }

    return user
  }
}
