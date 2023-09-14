import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTabs1690694021765 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tabs",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "inspection_type_id", type: "int" },
          { name: "name", type: "varchar", length: "100" },
          { name: "name_en", type: "varchar", length: "100", isNullable: true },
          { name: "order", type: "smallint", default: 1 },
          { name: "type", type: "varchar", length: "100", isNullable: true },
          { name: "drawing_id", type: "int", isNullable: true, default: null }, // TODO: Chưa xac định đc ý nghĩa và mục đích
          { name: "mobile_input_unavailable_flag", type: "int", default: 0 },
          { name: "upload_flag", type: "int", default: 0 },
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
    await queryRunner.dropTable("tabs");
  }
}
