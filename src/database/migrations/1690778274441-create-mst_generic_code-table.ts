import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstGenericCodeTable1690778274441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_generic_code",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "key_type", type: "varchar", length: "20" },
          { name: "key_value", type: "varchar", length: "20" },
          { name: "attribute1", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "attribute2", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "attribute3", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "language", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "order", type: "smallint", isNullable: true, default: 1 },
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
    await queryRunner.dropTable("mst_generic_code");
  }
}
