import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTimeSpecifiedExceptionDaysTable1690760756499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "time_specified_type_exception_days",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "site_id", type: "int" },
          { name: "inspection_type_id", type: "int" },
          { name: "date", type: "date", isNullable: true, default: null },
          { name: "dayoff_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "possible_time_from", type: "time", isNullable: true, default: null },
          { name: "possible_time_at", type: "time", isNullable: true, default: null },
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
    await queryRunner.dropTable("time_specified_type_exception_days");
  }
}
