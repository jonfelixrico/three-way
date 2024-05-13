import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1715177088798 implements MigrationInterface {
  name = 'Migration1715177088798'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_202b9c99a71a2e239e3790b6f9"`)
    await queryRunner.query(`DROP INDEX "IDX_c4a1c829810945e15c6239d39b"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_chat_room_message" ("id" varchar PRIMARY KEY NOT NULL, "content" text NOT NULL, "timestamp" datetime NOT NULL, "senderId" varchar NOT NULL, "chatRoomId" varchar, CONSTRAINT "FK_df57c3f5f095e3da44229a90a44" FOREIGN KEY ("chatRoomId") REFERENCES "chat_room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_chat_room_message"("id", "content", "timestamp", "senderId", "chatRoomId") SELECT "id", "content", "timestamp", "senderId", "chatRoomId" FROM "chat_room_message"`
    )
    await queryRunner.query(`DROP TABLE "chat_room_message"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_chat_room_message" RENAME TO "chat_room_message"`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_c4a1c829810945e15c6239d39b" ON "chat_room_message" ("timestamp") `
    )
    await queryRunner.query(`DROP INDEX "IDX_c4a1c829810945e15c6239d39b"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_chat_room_message" ("id" varchar PRIMARY KEY NOT NULL, "content" text NOT NULL, "timestamp" datetime NOT NULL, "senderId" varchar, "chatRoomId" varchar, CONSTRAINT "FK_df57c3f5f095e3da44229a90a44" FOREIGN KEY ("chatRoomId") REFERENCES "chat_room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_chat_room_message"("id", "content", "timestamp", "senderId", "chatRoomId") SELECT "id", "content", "timestamp", "senderId", "chatRoomId" FROM "chat_room_message"`
    )
    await queryRunner.query(`DROP TABLE "chat_room_message"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_chat_room_message" RENAME TO "chat_room_message"`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_c4a1c829810945e15c6239d39b" ON "chat_room_message" ("timestamp") `
    )
    await queryRunner.query(`DROP INDEX "IDX_c4a1c829810945e15c6239d39b"`)
    await queryRunner.query(
      `CREATE TABLE "temporary_chat_room_message" ("id" varchar PRIMARY KEY NOT NULL, "content" text NOT NULL, "timestamp" datetime NOT NULL, "senderId" varchar, "chatRoomId" varchar, CONSTRAINT "FK_df57c3f5f095e3da44229a90a44" FOREIGN KEY ("chatRoomId") REFERENCES "chat_room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_202b9c99a71a2e239e3790b6f9f" FOREIGN KEY ("senderId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "temporary_chat_room_message"("id", "content", "timestamp", "senderId", "chatRoomId") SELECT "id", "content", "timestamp", "senderId", "chatRoomId" FROM "chat_room_message"`
    )
    await queryRunner.query(`DROP TABLE "chat_room_message"`)
    await queryRunner.query(
      `ALTER TABLE "temporary_chat_room_message" RENAME TO "chat_room_message"`
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_c4a1c829810945e15c6239d39b" ON "chat_room_message" ("timestamp") `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_c4a1c829810945e15c6239d39b"`)
    await queryRunner.query(
      `ALTER TABLE "chat_room_message" RENAME TO "temporary_chat_room_message"`
    )
    await queryRunner.query(
      `CREATE TABLE "chat_room_message" ("id" varchar PRIMARY KEY NOT NULL, "content" text NOT NULL, "timestamp" datetime NOT NULL, "senderId" varchar, "chatRoomId" varchar, CONSTRAINT "FK_df57c3f5f095e3da44229a90a44" FOREIGN KEY ("chatRoomId") REFERENCES "chat_room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "chat_room_message"("id", "content", "timestamp", "senderId", "chatRoomId") SELECT "id", "content", "timestamp", "senderId", "chatRoomId" FROM "temporary_chat_room_message"`
    )
    await queryRunner.query(`DROP TABLE "temporary_chat_room_message"`)
    await queryRunner.query(
      `CREATE INDEX "IDX_c4a1c829810945e15c6239d39b" ON "chat_room_message" ("timestamp") `
    )
    await queryRunner.query(`DROP INDEX "IDX_c4a1c829810945e15c6239d39b"`)
    await queryRunner.query(
      `ALTER TABLE "chat_room_message" RENAME TO "temporary_chat_room_message"`
    )
    await queryRunner.query(
      `CREATE TABLE "chat_room_message" ("id" varchar PRIMARY KEY NOT NULL, "content" text NOT NULL, "timestamp" datetime NOT NULL, "senderId" varchar NOT NULL, "chatRoomId" varchar, CONSTRAINT "FK_df57c3f5f095e3da44229a90a44" FOREIGN KEY ("chatRoomId") REFERENCES "chat_room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "chat_room_message"("id", "content", "timestamp", "senderId", "chatRoomId") SELECT "id", "content", "timestamp", "senderId", "chatRoomId" FROM "temporary_chat_room_message"`
    )
    await queryRunner.query(`DROP TABLE "temporary_chat_room_message"`)
    await queryRunner.query(
      `CREATE INDEX "IDX_c4a1c829810945e15c6239d39b" ON "chat_room_message" ("timestamp") `
    )
    await queryRunner.query(`DROP INDEX "IDX_c4a1c829810945e15c6239d39b"`)
    await queryRunner.query(
      `ALTER TABLE "chat_room_message" RENAME TO "temporary_chat_room_message"`
    )
    await queryRunner.query(
      `CREATE TABLE "chat_room_message" ("id" varchar PRIMARY KEY NOT NULL, "content" text NOT NULL, "timestamp" datetime NOT NULL, "senderId" varchar NOT NULL, "chatRoomId" varchar, CONSTRAINT "FK_df57c3f5f095e3da44229a90a44" FOREIGN KEY ("chatRoomId") REFERENCES "chat_room" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    )
    await queryRunner.query(
      `INSERT INTO "chat_room_message"("id", "content", "timestamp", "senderId", "chatRoomId") SELECT "id", "content", "timestamp", "senderId", "chatRoomId" FROM "temporary_chat_room_message"`
    )
    await queryRunner.query(`DROP TABLE "temporary_chat_room_message"`)
    await queryRunner.query(
      `CREATE INDEX "IDX_c4a1c829810945e15c6239d39b" ON "chat_room_message" ("timestamp") `
    )
    await queryRunner.query(
      `CREATE INDEX "IDX_202b9c99a71a2e239e3790b6f9" ON "chat_room_message" ("senderId") `
    )
  }
}
