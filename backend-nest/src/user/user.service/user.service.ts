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

  /**
   * @returns null if no account was created because of the username being taken. Else, returns the newly-created user.
   */
  async create({
    username,
    password,
  }: {
    username: string
    password: string
  }): Promise<IUser | null> {
    if (
      await this.userDb.findOne({
        where: {
          username,
        },
      })
    ) {
      return null
    }

    const user = await this.userDb.save({
      encryptedPassword: await hash(password, SALT_ROUNDS),
      username,
    })

    return instanceToPlain(user) as IUser
  }

  /**
   * @returns null if the credentials are incorrect. Else, returns the matching user.
   */
  async verifyCredentials(
    username: string,
    password: string
  ): Promise<IUser | null> {
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

  async getById(id: string): Promise<IUser | null> {
    const user = await this.userDb.findOne({
      where: {
        id,
      },
    })

    return instanceToPlain(user) as IUser
  }
}
