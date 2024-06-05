import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { initializeTransactionalContext } from 'typeorm-transactional'

describe('register', () => {
  beforeAll(() => {
    initializeTransactionalContext()
  })

  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  test('register - happy path', async () => {
    const credentials = {
      username: `Username ${Date.now()}`,
      password: 'p@ssw0rd',
    }

    await request(app.getHttpServer())
      .post('/register')
      .send(credentials)
      .expect(HttpStatus.CREATED)

    // log in to test that the user exists
    const response = await request(app.getHttpServer())
      .post('/auth')
      .send(credentials)
      .expect(HttpStatus.OK)

    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.stringMatching(/.*/),
      })
    )
  })

  test('register - username exists', async () => {
    await request(app.getHttpServer())
      .post('/register')
      .send({
        username: 'seed-1',
        password: 'password',
      })
      .expect(HttpStatus.CONFLICT)
  })

  test('check username - happy path', async () => {
    // provide taken name
    const res1 = await request(app.getHttpServer())
      .get('/register')
      .query({
        username: 'seed-1',
      })
      .expect(HttpStatus.OK)

    expect(res1.body).toEqual(
      expect.objectContaining({
        taken: true,
      })
    )

    // provide available name
    const res2 = await request(app.getHttpServer())
      .get('/register')
      .query({
        username: `should-not-be-taken-${Date.now()}`,
      })
      .expect(HttpStatus.OK)

    expect(res2.body).toEqual(
      expect.objectContaining({
        taken: true,
      })
    )
  })

  test('check username - missing username param', async () => {
    await request(app.getHttpServer())
      .get('/register')
      .expect(HttpStatus.BAD_REQUEST)
  })
})
