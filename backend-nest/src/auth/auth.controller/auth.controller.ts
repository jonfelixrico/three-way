import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { IUser } from 'src/user/user.types'

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post()
  async authenticate(@Request() req: { user: IUser }) {
    const { id } = req.user
    return { id }
  }
}
