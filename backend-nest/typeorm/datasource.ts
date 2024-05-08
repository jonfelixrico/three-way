import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'sqlite',
  database: 'db',
  entities: [
    /*
     * Even though we strictly use ts, we still need to include js in the glob.
     * If we don't, the app will not work properly when ran when already transpiled to js
     */
    __dirname + '/src/**/*.entity.{ts,js}',
  ],
  synchronize: true,
})
