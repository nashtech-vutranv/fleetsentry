import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBatchTable1694351152837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "batch_vehicle",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "type", type: "smallint", isNullable: true, default: null, comment: "1.Background, 2.Manual" },
          { name: "area_code", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "inspection_type_id", type: "int", isNullable: true, default: null },
          { name: "qty1", type: "int", isNullable: true, default: 0, comment: "Case 10 days" },
          { name: "qty2", type: "int", isNullable: true, default: 0, comment: "Case 45 days" },
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
    await queryRunner.dropTable("batch_vehicle");
  }
}
