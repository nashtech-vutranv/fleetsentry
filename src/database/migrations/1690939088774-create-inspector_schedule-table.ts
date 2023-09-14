import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInspectorScheduleTable1690939088774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inspector_schedule",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "inspector_id", type: "int" },
          { name: "date", type: "date" },
          { name: "operating_time_from", type: "time", isNullable: true, default: null },
          { name: "operating_time_to", type: "time", isNullable: true, default: null },
          { name: "dayoff_flag", type: "smallint", isNullable: true, default: null, comment: "1(TRUE), 0(FALSE)" },
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
    await queryRunner.dropTable("inspector_schedule");
  }
}
