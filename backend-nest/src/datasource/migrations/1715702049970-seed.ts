import { MigrationInterface, QueryRunner } from 'typeorm'

const uuids = `
03ef5431-ad41-4543-8918-d63bab07e2a8
28290a95-7f8d-40c4-8187-2d004f8a8625
5b16c92f-5479-4d89-8282-4d5bb2ce911f
36352646-d85f-49e1-bac1-d6f29907bd90
69a492c3-0396-453a-bd56-e25cb5c59e87
42849b30-2a22-41e6-bbcf-a87c1008fa9e
4e41d40b-5e5f-4227-a0a0-1f4901c40556
4ae0a385-465f-459c-bac9-ba90f9d45155
d958c60e-9f7a-40da-8b5a-162939098edf
`
  .split('\n')
  .filter(Boolean)

export class Seed1715702049970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < uuids.length; i++) {
      const uuid = uuids[i]

      await queryRunner.query(
        /*
         * password is "p@ssw0rd"
         * We're starting at 2 because we already have seed-1 from Seed1715172194613
         */
        `INSERT INTO "user"("id", "username", "encryptedPassword") VALUES ("${uuid}", "seed-${2 + i}", "$2y$10$hV89MATrcSZ92N86idD1re45zKz96Bqi6WFRku3jEMEuPhGo6KtjC")`
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const uuid of uuids) {
      await queryRunner.query(`DELETE FROM "user" WHERE id = "${uuid}"`)
    }
  }
}
