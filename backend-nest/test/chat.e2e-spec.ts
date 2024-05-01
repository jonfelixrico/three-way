import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/chat (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/chat/any-id-here')
    expect(response.body).toBe(
      expect.objectContaining({
        // TODO change this once we start implementing real chatrooms
        name: 'GLOBAL',
      })
    )
  })
})
