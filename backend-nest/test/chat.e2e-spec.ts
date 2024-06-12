import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { MockGuard } from 'test/mock-guard'
import { Seed1715702049970 } from 'src/datasource/migrations/1715702049970-seed'
import { initializeTransactionalContext } from 'typeorm-transactional'
import { Seed1718191393819 } from 'src/datasource/migrations/1718191393819-seed'
import { range } from 'lodash'

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
      .get(`/chat/${Seed1718191393819.SEED_ROOM_IDS[0]}`)
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'seed-room-0',
      })
    )
  })

  test('Create room', async () => {
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
  })

  test('Send message', async () => {
    const now = Date.now()
    const messagesToSend = range(1, 10).map((no) => `Test message ${now} ${no}`)
    const ROOM_ID = Seed1718191393819.SEED_ROOM_IDS[0]

    for (const message of messagesToSend) {
      await request(app.getHttpServer())
        .post(`/chat/${ROOM_ID}/message`)
        .send({
          content: message,
        })
        .expect(201)
    }

    const messagesResp = await request(app.getHttpServer())
      .get(`/chat/${ROOM_ID}/message`)
      .expect(200)

    expect(messagesResp.body.messages).toEqual(
      expect.arrayContaining(
        messagesToSend.map((message) =>
          expect.objectContaining({
            content: message,
          })
        )
      )
    )
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
        userIds: Seed1715702049970.SEED_USER_IDS,
      })
      .expect(201)

    const userListResponse = await request(app.getHttpServer())
      .get(`/chat/${id}/user`)
      .expect(200)

    expect(userListResponse.body).toHaveLength(10)
  })
})
