import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'

describe('user - public', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  test('Register + login', async () => {
    const credentials = {
      username: `Username ${Date.now()}`,
      password: 'p@ssw0rd',
    }

    await request(app.getHttpServer())
      .post('/register')
      .send(credentials)
      .expect(201)

    await request(app.getHttpServer())
      .post('/auth')
      .send(credentials)
      .expect(200)
  })
})
