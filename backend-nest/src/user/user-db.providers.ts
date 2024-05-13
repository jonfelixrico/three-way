import { Provider } from '@nestjs/common'
import { DATASOURCE_PROVIDER } from 'src/datasource/datasource.constants'
import { User } from 'src/user/user.entity'
import { DataSource } from 'typeorm'

export const USER_DB = Symbol('USER_DB')

export function provideUserDb(): Provider {
  return {
    provide: USER_DB,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATASOURCE_PROVIDER],
  }
}
