import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMultiInspectionTypeTable1690771738550 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "multi_inspection_types",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "inspection_type_id_1", type: "int" },
          { name: "inspection_type_id_2", type: "int" },
          { name: "inspection_name", type: "varchar", length: "255" },
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
    await queryRunner.dropTable("multi_inspection_types");
  }

}
