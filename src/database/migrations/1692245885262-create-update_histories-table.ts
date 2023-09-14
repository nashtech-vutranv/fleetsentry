import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUpdateHistoriesTable1692243428043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "update_history",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "order_number", type: "varchar", length: "100" },
          { name: "item", type: "varchar", length: "20" },
          { name: "seqn", type: "smallint" },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "inspection_type_id", type: "int" },
          { name: "inspection_h_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "inspection_d_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "inspection_schedule_result_id", type: "int" },
          { name: "coordinate_item_results_id", type: "int" },
          { name: "before_value", type: "varchar", length: "100" },
          { name: "after_change_value", type: "varchar", length: "100" },
          { name: "created_by", type: "int", default: null },
          { name: "updated_by", type: "int", default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("update_history");
  }
}
