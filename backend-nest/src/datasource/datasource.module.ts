import { Module } from '@nestjs/common'
import { DatasourceProvider } from 'src/datasource/datasource.provider'

@Module({
  providers: [DatasourceProvider],
  exports: [DatasourceProvider],
})
export class DatasourceModule {}
