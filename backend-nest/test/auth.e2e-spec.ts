import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'

describe('auth', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  test('correct credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth')
      .send({
        username: 'seed-1',
        password: 'p@ssw0rd',
      })
      .expect(200)
  })

  test('incorrect credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth')
      .send({
        username: 'seed-1',
        password: 'WRONG PASSWORD!',
      })
      .expect('401')
  })
})
