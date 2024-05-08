import { Provider } from '@nestjs/common'
import { DATASOURCE_PROVIDER } from 'src/datasource/datasource.constants'
import { DataSource } from 'typeorm'

export const DatasourceProvider: Provider = {
  provide: DATASOURCE_PROVIDER,
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: 'db',
      entities: [
        /*
         * Even though we strictly use ts, we still need to include js in the glob.
         * If we don't, the app will not work properly when ran when already transpiled to js
         */
        __dirname + '/../**/*.entity.{ts,js}',
      ],
      // TODO remove once we're starting to work on production-ready code
      synchronize: true,
    })

    return dataSource.initialize()
  },
}
