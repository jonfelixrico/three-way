import { MigrationInterface, QueryRunner } from 'typeorm'

export class Seed1715698245510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "chat_room"("id", "name") VALUES ("aab316fe-f3a4-4dc7-a220-44c3a5b24a16", "Seed room 1")`
    )

    await queryRunner.query(
      `INSERT INTO "chat_room_member"("userId", "chatId", "isOwner") VALUES ("aab316fe-f3a4-4dc7-a220-44c3a5b24a16", "20354d7a-e4fe-47af-8ff6-187bca92f3f9", 1)`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "chat_room_member" WHERE chatId = "aab316fe-f3a4-4dc7-a220-44c3a5b24a16"`
    )

    await queryRunner.query(
      `DELETE FROM "chat_room" WHERE id = "aab316fe-f3a4-4dc7-a220-44c3a5b24a16"`
    )
  }
}
