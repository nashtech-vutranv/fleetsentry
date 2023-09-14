import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInspectionTypeItemsTable1690770636677 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inspection_type_item",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "inspection_type_id", type: "int" },
          { name: "inspection_item_id", type: "int" },
          { name: "required_flag", type: "smallint", isNullable: true, default: null, comment: "1-0 (true-false)" },
          { name: "pass_target_flag", type: "smallint", isNullable: true, default: null, comment: "1-0 (true-false)" },
          { name: "threshold", type: "float", isNullable: true, default: null },
          { name: "passing_value", type: "varchar", length: "100", isNullable: true, default: null },
          { name: "used_flag", type: "smallint", isNullable: true, default: null, comment: "1-0 (true-false)" },
          { name: "en_result_required_flag", type: "smallint", isNullable: true, default: null, comment: "1-0 (true-false)" },
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
    await queryRunner.dropTable("inspection_type_item");
  }

}
