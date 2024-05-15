import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import {
  addTransactionalDataSource,
  getDataSourceByName,
} from 'typeorm-transactional'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: async (cfg: ConfigService) => {
        const inProduction = cfg.get('NODE_ENV') === 'production'

        return {
          type: 'sqlite',
          database: 'db.sqlite',
          entities: [
            /*
             * Even though we strictly use ts, we still need to include js in the glob.
             * If we don't, the app will not work properly when ran when already transpiled to js
             */
            `${__dirname}/../**/*.entity.{ts,js}`,
          ],
          migrations: [
            `${__dirname}/migrations/*-migration.{ts,js}`,
            inProduction ? null : `${__dirname}/migrations/*-seed.{ts,js}`,
          ].filter(Boolean),
          migrationsRun: true,
        }
      },

      dataSourceFactory: async (options) =>
        // This is to make this work with NestJS tests. See https://github.com/Aliheym/typeorm-transactional/issues/10
        getDataSourceByName('default') ??
        addTransactionalDataSource(new DataSource(options)),
    }),
  ],
})
export class DatasourceModule {}
