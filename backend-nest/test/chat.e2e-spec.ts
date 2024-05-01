import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from 'src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

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
    const postResponse = await request(app.getHttpServer())
      .post('/chat/global/message')
      .send({
        content: 'Test message',
      })
      .expect(201)
    expect(postResponse.body).toEqual(
      expect.objectContaining({
        // TODO change this once we start implementing real chatrooms
        content: 'Test message',
      })
    )

    const getResponse = await request(app.getHttpServer())
      .get('/chat/global/message')
      .expect(200)

    expect(getResponse.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: 'Test message',
        }),
      ])
    )
  })
})
