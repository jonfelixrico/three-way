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
import { Seed1718196626285 } from 'src/datasource/migrations/1718196626285-seed'
import { Seed1715172194613 } from 'src/datasource/migrations/1715172194613-seed'

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

  test('Find chat', async () => {
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
    const name = `Test chat ${Date.now()}`

    const newChatResponse = await request(app.getHttpServer())
      .post('/chat')
      .send({
        name,
      })
      .expect(201)

    expect(newChatResponse.body).toEqual(
      expect.objectContaining({
        id: expect.stringMatching(/.+/),
        name,
        members: expect.arrayContaining([
          expect.objectContaining({
            id: Seed1715172194613.SEED_1_ID,
          }),
        ]),
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

  test('Add user', async () => {
    const CHAT_ID = Seed1718196626285.SEED_ROOM_IDS[0]

    await request(app.getHttpServer())
      .post(`/chat/${CHAT_ID}/user`)
      .send({
        userIds: Seed1715702049970.SEED_USER_IDS,
      })
      .expect(201)

    const userListResponse = await request(app.getHttpServer())
      .get(`/chat/${CHAT_ID}/user`)
      .expect(200)

    expect(userListResponse.body).toEqual(
      expect.arrayContaining(
        Seed1715702049970.SEED_USER_IDS.map((id) =>
          expect.objectContaining({
            id,
          })
        )
      )
    )
  })
})
