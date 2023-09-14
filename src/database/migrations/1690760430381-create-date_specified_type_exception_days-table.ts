import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDateSpecifiedTypeExceptionDaysTable1690760430381 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "date_specified_type_exception_days",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "site_id", type: "int" },
          { name: "inspection_type_id", type: "int" },
          { name: "date", type: "date", isNullable: true, default: null },
          { name: "dayoff_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "possible_count", type: "smallint", isNullable: true, default: null },
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
    await queryRunner.dropTable("date_specified_type_exception_days");
  }
}
