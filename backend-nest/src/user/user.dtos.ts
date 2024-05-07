import { IUser } from 'src/user/user.types'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserDto {
  export class UserRespDto implements IUser {
    id: string
    username: string
  }

  export class CreateUserReqDto {
    username: string
    password: string
  }
}
