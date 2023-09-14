import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotificationUserTable1692351018725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notification_user",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "notification_id", type: "int", isNullable: false }, // todo FK
          { name: "recipient_id", type: "int", isNullable: false }, // todo FK
          { name: "sender_id", type: "int", isNullable: true, default: null }, // todo FK
          { name: "received_at", type: "timestamp", isNullable: true, default: null },
          { name: "read_flag", type: "smallint", default: 0, comment: "0-1 - FALSE, TRUE" },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notification_user");
  }
}
