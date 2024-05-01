import { Provider } from '@nestjs/common'
import { DATASOURCE_PROVIDER } from 'src/datasource/datasource.constants'
import { DataSource } from 'typeorm'

export const DatasourceProvider: Provider = {
  provide: DATASOURCE_PROVIDER,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      // TODO make this configurable via env
      database: 'db',
      entities: [__dirname + '/../**.entity.ts'],
      // TODO remove once we're starting to work on production-ready code
      synchronize: true,
    })

    return dataSource.initialize()
  },
}
