import { Injectable } from '@nestjs/common'
import { User } from 'src/user/user.entity'
import { Like, Repository } from 'typeorm'
import { hash, compare } from 'bcrypt'
import { IUser } from 'src/user/user.types'
import { instanceToPlain } from 'class-transformer'
import { InjectRepository } from '@nestjs/typeorm'

const SALT_ROUNDS = 10

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userDb: Repository<User>) {}

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

  async getByUsername(username: string): Promise<IUser | null> {
    const user = await this.userDb.findOne({
      where: {
        username,
      },
    })

    return instanceToPlain(user) as IUser
  }

  async findByUsername(username: string): Promise<IUser[]> {
    const users = await this.userDb.find({
      where: {
        username: Like(`${username}%`),
      },
    })

    return users.map((user) => instanceToPlain(user) as IUser)
  }
}
