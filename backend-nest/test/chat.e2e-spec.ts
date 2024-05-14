import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { MockGuard } from 'test/mock-guard'
import { initializeTransactionalContext } from 'typeorm-transactional'

describe('chat', () => {
  let app: INestApplication

  beforeEach(async () => {
    initializeTransactionalContext()
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })

      .overrideProvider(JwtAuthGuard)
      .useClass(MockGuard)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  test('Checking of chat existence', async () => {
    const response = await request(app.getHttpServer())
      // This chat is from Seed1715698245510
      .get('/chat/aab316fe-f3a4-4dc7-a220-44c3a5b24a16')
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Seed room 1',
      })
    )

    await request(app.getHttpServer()).get('/chat/does-not-exist').expect(403)
  })

  test('Room creation + sending of messages', async () => {
    const newChatResponse = await request(app.getHttpServer())
      .post('/chat')
      .send({
        name: `Test chat ${Date.now()}`,
      })
      .expect(201)

    expect(newChatResponse.body).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(/.+/),
      })
    )

    const { id } = newChatResponse.body

    for (let i = 0; i < 10; i++) {
      const messageContent = `Test message ${i + 1}`

      await request(app.getHttpServer())
        .post(`/chat/${id}/message`)
        .send({
          content: messageContent,
        })
        .expect(201)
    }

    const messagesResp = await request(app.getHttpServer())
      .get(`/chat/${id}/message`)
      .expect(200)

    expect(messagesResp.body).toHaveLength(10)
  })

  test('Room creation + adding of users', async () => {
    const newChatResponse = await request(app.getHttpServer())
      .post('/chat')
      .send({
        name: `Test chat ${Date.now()}`,
      })
      .expect(201)

    const { id } = newChatResponse.body

    await request(app.getHttpServer())
      .post(`/chat/${id}/user`)
      .send({
        userId: '36352646-d85f-49e1-bac1-d6f29907bd90',
      })
      .expect(201)
  })
})
