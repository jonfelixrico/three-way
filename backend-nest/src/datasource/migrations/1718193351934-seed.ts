import { Seed1715172194613 } from 'src/datasource/migrations/1715172194613-seed'
import { Seed1715702049970 } from 'src/datasource/migrations/1715702049970-seed'
import { Seed1718191393819 } from 'src/datasource/migrations/1718191393819-seed'
import { MigrationInterface, QueryRunner } from 'typeorm'

const OWNER_ID = Seed1715172194613.SEED_1_ID
const MEMBER_IDS = Seed1715702049970.SEED_USER_IDS

const ROOM_IDS = Seed1718191393819.SEED_ROOM_IDS

/**
 * Follow up to Seed1718191393819; this adds seed users 1-10 (seed-*) to
 * seed rooms 0-9 [seed-room-*]. seed-1 will be the owner of the rooms.
 *
 * This is in a separate seed migration since I forgot to do it in the previous one.
 */
export class Seed1718193351934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const roomId of ROOM_IDS) {
      await queryRunner.query(
        'INSERT INTO "chat_room_member"("chatId", "userId", "isOwner") VALUES (?, ?, ?)',
        [roomId, OWNER_ID, true]
      )

      for (const userId of MEMBER_IDS) {
        await queryRunner.query(
          'INSERT INTO "chat_room_member"("chatId", "userId", "isOwner") VALUES (?, ?, ?)',
          [roomId, userId, false]
        )
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const roomId of ROOM_IDS) {
      await queryRunner.query(
        'DELETE FROM chat_room_member where chat_id = ?',
        [roomId]
      )
    }
  }
}
