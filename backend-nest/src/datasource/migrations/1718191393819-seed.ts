import { MigrationInterface, QueryRunner } from 'typeorm'

export const SEED_ROOM_IDS = `
3568b9d8-95c3-4310-a6a0-93d1d672a70f
0e1c64c6-4c7f-42bc-a672-88b58bce529b
2599d071-f6c6-406a-882a-fbef0cd5f155
155bd59b-d911-409a-8393-49d882b1da3b
ddd31ac4-0529-4f03-a20f-0241a4e637df
32c0dd55-bb76-48f4-94ec-8593825036ab
66c506b1-53b9-479b-8132-888be69e9e3c
bddce262-87e6-4c38-8ff2-9a3fb36d9bf5
1d44fce2-643c-474d-b999-5dda7a65def9
fa7eede1-6c3a-47a1-b9a3-01d8106ccee0
`
  .split('\n')
  .map((s) => s.trim())
  .filter(Boolean)

/**
 * Create 10 chat rooms for testing purposes
 */
export class Seed1718191393819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < SEED_ROOM_IDS.length; i++) {
      await queryRunner.query(
        'INSERT INTO "chat_room"("id", "name") VALUES (?, ?)',
        [SEED_ROOM_IDS[i], `seed-room-${i}`]
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    for (const id of SEED_ROOM_IDS) {
      await queryRunner.query('DELETE FROM "chat_room" WHERE id = ?', [id])
    }
  }
}
