import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

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

          logging: true,
        }
      },
    }),
  ],
})
export class DatasourceModule {}
