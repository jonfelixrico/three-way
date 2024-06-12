import { Seed1715172194613 } from 'src/datasource/migrations/1715172194613-seed'
import { MigrationInterface, QueryRunner } from 'typeorm'

const IDS = `
631deb3e-90d7-4369-aa6a-23cf69a11628
ae514858-df96-4b32-a360-7d6bba7ab8d6
aad47039-ebc4-4ef0-b703-81be90b96239
7612c57f-b4b6-4129-93fa-a811033ceb2b
c01457da-21e3-4092-9fe7-2056d9969c3a
ccbc3cf1-9395-42a7-9ef6-a4e8fb3bdcd2
caf436aa-1cc9-4fa7-ba09-b267e5679318
02460461-acca-40a5-b11e-9048d9ce40bd
0e26b4a8-b853-449f-8086-a68959247b44
ad823dff-a160-466f-9417-a0796fe859c7
`
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean)

/**
 * Create more seed rooms, but this time only seed-1 is the member.
 */
export class Seed1718196626285 implements MigrationInterface {
  static SEED_ROOM_IDS = IDS

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < IDS.length; i++) {
      await queryRunner.query(
        'INSERT INTO "chat_room"("id", "name") VALUES (?, ?)',
        [IDS[i], `seed-room-${100 + i}`]
      )
      await queryRunner.query(
        'INSERT INTO "chat_room_member"("chatId", "userId", "isOwner") VALUES (?, ?, ?)',
        [IDS[i], Seed1715172194613.SEED_1_ID, true]
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const chatId of IDS) {
      await queryRunner.query(
        'DELETE FROM "chat_room_member" WHERE chatId = ?',
        [chatId]
      )
      await queryRunner.query('DELETE FROM "chat_room" WHERE id = ?', [chatId])
    }
  }
}
