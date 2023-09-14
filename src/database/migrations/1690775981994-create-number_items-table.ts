import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNumberItemsItemsTable1690775981994 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "number_items",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "inspection_item_id", type: "int" },
          { name: "min_digits", type: "int", isNullable: true, default: 0 },
          { name: "max_digits", type: "int", isNullable: true, default: 255 },
          { name: "decimal_point_digits", type: "smallint", isNullable: true, default: 0 },
          { name: "unit", type: "varchar", length: "50", isNullable: true, default: null },
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
    await queryRunner.dropTable("number_items");
  }
}
