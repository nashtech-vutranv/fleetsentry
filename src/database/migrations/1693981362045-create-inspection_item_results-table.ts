import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateInspectionItemResultsTable1693981362045 implements MigrationInterface {
  /**
   * @author vungpv93@gmail.com
   * @functionName migration
   * @param queryRunner
   *
   * 1. Create inspection_item_results table
   * 2. Create fk : inspection_schedule_result_id and inspection_item_id
   * 3. Create Unique key : (inspection_schedule_result_id + inspection_item_id)
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inspection_item_results",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "inspection_schedule_result_id", type: "int" },
          { name: "inspection_item_id", type: "int" },
          { name: "inspection_data", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "inspection_data_en", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "pass_fail_result", type: "smallint", isNullable: true, default: null },
          {
            name: "coordinate",
            type: "varchar",
            length: "100",
            isNullable: true,
            default: null,
            comment: "Only coordinate",
          },
          {
            name: "value1",
            type: "varchar",
            length: "100",
            isNullable: true,
            default: null,
            comment: "Only coordinate",
          },
          {
            name: "value2",
            type: "varchar",
            length: "100",
            isNullable: true,
            default: null,
            comment: "Only coordinate",
          },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      "inspection_item_results",
      new TableForeignKey({
        name: "fk_inspection_item_results___inspection_schedule_result_id",
        columnNames: ["inspection_schedule_result_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_schedule_results",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_item_results",
      new TableForeignKey({
        name: "fk_inspection_item_results___inspection_item_id",
        columnNames: ["inspection_item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "mst_inspection_items",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createIndex(
      "inspection_item_results",
      new TableIndex({
        name: "inspection_item_results_unique",
        columnNames: ["inspection_schedule_result_id", "inspection_item_id"],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("inspection_item_results");
  }
}
