import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateDevicesTable1694216190591 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "devices",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "user_id", type: "int", isNullable: true, default: null },
          { name: "uuid", type: "varchar", length: "100", isNullable: true, default: null },
          { name: "os", type: "smallint", isNullable: true, default: null, comment: "1. iOS, 2. android" },
          { name: "os_version", type: "varchar", length: "20", isNullable: true, default: null, comment: "1.14.99" },
          { name: "app_version", type: "varchar", length: "20", isNullable: true, default: null, comment: "1.14.99" },
          { name: "fcm_token", type: "varchar", length: "200", isNullable: true, default: null },
          { name: "payload", type: "jsonb", isNullable: true, default: null },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint(
      "devices",
      new TableUnique({ name: "device_unique", columnNames: ["uuid"] }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("devices");
  }
}
