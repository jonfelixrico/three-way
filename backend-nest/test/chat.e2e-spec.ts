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

  test('Sending of messages', async () => {
    const content = `Test message ${Date.now()}`

    const postResponse = await request(app.getHttpServer())
      .post('/chat/aab316fe-f3a4-4dc7-a220-44c3a5b24a16/message')
      .send({
        content,
      })
      .expect(201)
    expect(postResponse.body).toEqual(
      expect.objectContaining({
        content,
      })
    )

    const getResponse = await request(app.getHttpServer())
      .get('/chat/aab316fe-f3a4-4dc7-a220-44c3a5b24a16/message')
      .expect(200)

    expect(getResponse.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content,
        }),
      ])
    )
  })
})
