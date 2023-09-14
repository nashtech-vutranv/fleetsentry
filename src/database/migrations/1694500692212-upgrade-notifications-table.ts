import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

/**
 * type: 1 - Gui tu Admin theo lich cho tat cả users
 * type: 2 - Gui tu Admin theo lich cho nhom users .
 * type: 3 - Gui tu Inspector toi 1 Inspector khac .
 */
export class UpgradeNotificationsTable1694500692212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("notifications", [
      new TableColumn({ name: "type", type: "smallint", isNullable: true, default: null, comment: "1,2,3" }),
      new TableColumn({ name: "payload", type: "jsonb", isNullable: true, default: null }),
      new TableColumn({ name: "update_able", type: "smallint", isNullable: true, default: 0 }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("notifications", ["type", "payload", "update_able"]);
  }
}
