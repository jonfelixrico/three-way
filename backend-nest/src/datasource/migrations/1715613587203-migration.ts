import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1715613587203 implements MigrationInterface {
  name = 'Migration1715613587203'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "chat_room_member" ("chatId" varchar NOT NULL, "userId" varchar NOT NULL, "isOwner" boolean NOT NULL, PRIMARY KEY ("chatId", "userId"))`
    )
    await queryRunner.query(
      `CREATE TABLE "temporary_chat_room_member" ("chatId" varchar NOT NULL, "userId" varchar NOT NULL, "isOwner" boolean NOT NULL, CONSTRAINT "FK_23b1255c79a23d668abefbc6a20" FOREIGN KEY ("chatId") REFERENCES "chat_room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_2b97b57673fac4ff6f2455ffae7" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("chatId", "userId"))`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_chat_room_member"("chatId", "userId", "isOwner") SELECT "chatId", "userId", "isOwner" FROM "chat_room_member"`
    )
    await queryRunner.query(`DROP TABLE "chat_room_member"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_chat_room_member" RENAME TO "chat_room_member"`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "chat_room_member" RENAME TO "temporary_chat_room_member"`
    )
    await queryRunner.query(
      `CREATE TABLE "chat_room_member" ("chatId" varchar NOT NULL, "userId" varchar NOT NULL, "isOwner" boolean NOT NULL, PRIMARY KEY ("chatId", "userId"))`
    )
    await queryRunner.query(
      `INSERT INTO "chat_room_member"("chatId", "userId", "isOwner") SELECT "chatId", "userId", "isOwner" FROM "temporary_chat_room_member"`
    )
    await queryRunner.query(`DROP TABLE "temporary_chat_room_member"`)
    await queryRunner.query(`DROP TABLE "chat_room_member"`)
  }
}
