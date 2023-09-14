import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMultiTabItemsTable1690771779245 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "multi_tab_items",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "multi_inspection_type_id", type: "int" },
          { name: "multi_inspection_tab_id", type: "int" },
          { name: "item_id", type: "int" },
          { name: "order", type: "int", default: 1 },
          { name: "used_flag", type: "smallint", default: 1 },
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
    await queryRunner.dropTable("multi_tab_items");
  }

}
