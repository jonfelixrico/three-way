import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { randomUUID } from 'crypto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { MockGuard } from 'test/mock-guard'

describe('chat', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })

      .overrideProvider(JwtAuthGuard)
      .useClass(MockGuard)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  test('GET /chat/:id', async () => {
    const response = await request(app.getHttpServer())
      .get('/chat/global')
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        // TODO change this once we start implementing real chatrooms
        name: 'global',
        id: 'global',
      })
    )
  })

  test('POST /chat/:id/message', async () => {
    const content = `Test message ${Date.now()}`
    const senderId = randomUUID()

    const postResponse = await request(app.getHttpServer())
      .post('/chat/global/message')
      .send({
        content,
        senderId,
      })
      .expect(201)
    expect(postResponse.body).toEqual(
      expect.objectContaining({
        // TODO change this once we start implementing real chatrooms
        content,
        senderId,
      })
    )

    const getResponse = await request(app.getHttpServer())
      .get('/chat/global/message')
      .expect(200)

    expect(getResponse.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content,
          senderId,
        }),
      ])
    )
  })
})
