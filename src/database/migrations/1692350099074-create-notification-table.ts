import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNotificationTable1692350099074 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notifications",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "title", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "body", type: "text", isNullable: true, default: null },
          { name: "release_from", type: "timestamp", isNullable: true, default: null },
          { name: "release_to", type: "timestamp", isNullable: true, default: null },
          { name: "important_flag", type: "smallint", default: 0, comment: "0-1 - FALSE, TRUE" },
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
    await queryRunner.dropTable("notifications");
  }
}
