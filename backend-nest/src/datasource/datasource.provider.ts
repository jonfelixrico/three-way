import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DATASOURCE_PROVIDER } from 'src/datasource/datasource.constants'
import { DataSource } from 'typeorm'

export const DatasourceProvider: Provider = {
  provide: DATASOURCE_PROVIDER,
  useFactory: async (cfg: ConfigService) => {
    const inProduction = cfg.get('NODE_ENV') === 'production'

    const dataSource = new DataSource({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        /*
         * Even though we strictly use ts, we still need to include js in the glob.
         * If we don't, the app will not work properly when ran when already transpiled to js
         */
        `${__dirname}/../**/*.entity.{ts,js}`,
      ],
      synchronize: !inProduction,
      migrations: [
        `${__dirname}/migrations/*-migration.{ts,js}`,
        inProduction ? null : `${__dirname}/migrations/*-seed.{ts,js}`,
      ],
    })

    return dataSource.initialize()
  },
  inject: [ConfigService],
}
