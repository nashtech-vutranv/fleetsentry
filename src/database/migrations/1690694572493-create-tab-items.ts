import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTabItems1690694572493 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tab_items",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "inspection_type_id", type: "int" },
          { name: "inspection_item_id", type: "int" },
          { name: "tab_id", type: "int" },
          { name: "order", type: "smallint", default: 1 },
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
    await queryRunner.dropTable("tab_items");
  }
}
