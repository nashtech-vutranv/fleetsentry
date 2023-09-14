import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInspectionTypeResultsTable1692353784785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inspection_type_results",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "inspection_type_id", type: "int", isNullable: false }, // todo FK
          { name: "inspection_result_code", type: "varchar", length: "20", isNullable: false }, // GenericCode
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
    await queryRunner.dropTable("inspection_type_results");
  }
}
