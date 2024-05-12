import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common'
import { UserId } from 'src/decorators/user-id.param-decorator'
import { CredentialsReqDto, UserRespDto } from 'src/user/user.dtos'
import { UserService } from 'src/user/user.service/user.service'

@Controller('user')
export class UserController {
  constructor(private svc: UserService) {}

  @Post()
  async create(@Body() body: CredentialsReqDto): Promise<UserRespDto> {
    return await this.svc.create(body)
  }

  @Get('@me')
  async getSessionUser(@UserId() userId: string): Promise<UserRespDto> {
    const user = await this.svc.getById(userId)

    if (!user) {
      throw new HttpException(
        'No matching user record found',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }

    return user
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
