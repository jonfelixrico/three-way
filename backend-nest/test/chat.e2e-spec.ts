import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { MockGuard } from 'test/mock-guard'
import { uuidList } from 'src/datasource/migrations/1715702049970-seed'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { SEED_ROOM_IDS } from 'src/datasource/migrations/1718191393819-seed'

describe('chat', () => {
  beforeAll(() => {
    initializeTransactionalContext()
  })

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

  test('Find chat -- non-existent', async () => {
    await request(app.getHttpServer()).get('/chat/does-not-exist').expect(403)
  })

  test('Find chat -- existing', async () => {
    const response = await request(app.getHttpServer())
      // This chat is from Seed1715698245510
      .get(`/chat/${SEED_ROOM_IDS[0]}`)
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'seed-room-0',
      })
    )
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

    expect(messagesResp.body.messages).toHaveLength(10)
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
        userIds: uuidList,
      })
      .expect(201)

    const userListResponse = await request(app.getHttpServer())
      .get(`/chat/${id}/user`)
      .expect(200)

    expect(userListResponse.body).toHaveLength(10)
  })
})
