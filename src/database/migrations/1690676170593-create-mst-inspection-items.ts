import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstInspectionItems1690676170593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_inspection_items",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "category", type: "varchar", length: "20", isNullable: true },
          { name: "name", type: "varchar", length: "255" },
          { name: "name_en", type: "varchar", length: "255", isNullable: true },
          { name: "short_name", type: "varchar", length: "255", isNullable: true },
          { name: "short_name_en", type: "varchar", length: "255", isNullable: true },
          { name: "input_type", type: "smallint", isNullable: false, default: 1 },
          { name: "min_digits", type: "smallint", isNullable: true, default: null, comment: "[1,2] number,text" },
          { name: "max_digits", type: "smallint", isNullable: true, default: null, comment: "[1,2] number,text" },
          { name: "decimal_point_digits", type: "smallint", isNullable: true, default: null, comment: "[1] number" },
          { name: "unit", type: "varchar", length: "50", isNullable: true, default: null, comment: "[1] number" },
          { name: "future_date_flag", type: "smallint", isNullable: true, default: 0, comment: "[4] date" },
          { name: "max_future_days", type: "smallint", isNullable: true, default: 0, comment: "[4] date" },
          { name: "past_date_flag", type: "smallint", isNullable: true, default: 0, comment: "[4] date" },
          { name: "max_past_days", type: "smallint", isNullable: true, default: 0, comment: "[4] date" },
          { name: "label", type: "varchar", isNullable: true, length: "100", comment: "[6] on_off" },
          { name: "value", type: "varchar", isNullable: true, length: "100", comment: "[6] on_off" },
          { name: "key_type", type: "varchar", isNullable: true, length: "20", comment: "[8] dropdown" },
          { name: "key_type_1", type: "varchar", isNullable: true, length: "20", comment: "[9] coordinate" },
          { name: "key_type_2", type: "varchar", isNullable: true, length: "20", comment: "[9] coordinate" },
          { name: "image_size", type: "varchar", isNullable: true, length: "20", comment: "[5] image" },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "deleted_at", type: "timestamp", isNullable: true, default: null },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("mst_inspection_items");
  }
}
