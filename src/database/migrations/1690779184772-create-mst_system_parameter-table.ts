import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstSystemParameterTable1690779184772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_system_parameter",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "name", type: "varchar", length: "100" },
          { name: "description", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "value", type: "varchar", length: "100" },
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
    await queryRunner.dropTable("mst_system_parameter");
  }
}
