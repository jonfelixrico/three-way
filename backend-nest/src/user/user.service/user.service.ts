import { Inject, Injectable } from '@nestjs/common'
import { USER_DB } from 'src/user/user-db.providers'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { hash, compare } from 'bcrypt'
import { IUser } from 'src/user/user.types'
import { instanceToPlain } from 'class-transformer'

const SALT_ROUNDS = 10

@Injectable()
export class UserService {
  constructor(@Inject(USER_DB) private userDb: Repository<User>) {}

  async create({
    username,
    password,
  }: {
    username: string
    password: string
  }): Promise<IUser> {
    const user = await this.userDb.save({
      encryptedPassword: await hash(password, SALT_ROUNDS),
      username,
    })

    return instanceToPlain(user) as IUser
  }

  async verifyCredentials(username: string, password: string): Promise<IUser> {
    const fromDb = await this.userDb.findOne({
      where: {
        username,
      },
    })

    if (!fromDb) {
      return null
    }

    const hasAMatch = await compare(password, fromDb.encryptedPassword)
    if (!hasAMatch) {
      return null
    }

    return instanceToPlain(fromDb) as IUser
  }

  async getById(id: string): Promise<IUser> {
    const user = await this.userDb.findOne({
      where: {
        id,
      },
    })

    return instanceToPlain(user) as IUser
  }
}
