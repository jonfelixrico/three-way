import { MigrationInterface, QueryRunner } from 'typeorm'

export class Seed1715172194613 implements MigrationInterface {
  name = 'Seed1715172194613'

  static SEED_1_ID = '20354d7a-e4fe-47af-8ff6-187bca92f3f9'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      // password is "p@ssw0rd"
      `INSERT INTO "user"("id", "username", "encryptedPassword") VALUES ("${Seed1715172194613.SEED_1_ID}", "seed-1", "$2a$10$PXpjUXwTKUBcVbbUPxEjvuviHPGIm2wzMJum/Nxd9O8kJbIFd69sW")`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE id = "${Seed1715172194613.SEED_1_ID}"`
    )
  }
}
