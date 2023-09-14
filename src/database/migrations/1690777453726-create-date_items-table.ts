import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDateItemsTable1690777453726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "date_items",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "inspection_item_id", type: "int" },
          { name: "future_date_flag", type: "smallint", isNullable: true, default: 0 },
          { name: "max_future_days", type: "smallint", isNullable: true, default: 0 },
          { name: "past_date_flag", type: "smallint", isNullable: true, default: 0 },
          { name: "max_past_days", type: "smallint", isNullable: true, default: 0 },
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
    await queryRunner.dropTable("date_items");
  }
}
