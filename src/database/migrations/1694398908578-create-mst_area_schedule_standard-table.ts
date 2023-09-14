import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstAreaScheduleStandardTable1694398908578 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_area_schedule_standard",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "area_code", type: "varchar", length: "20" },
          { name: "monday_standard_time_from", type: "time", isNullable: true, default: null },
          { name: "monday_standard_time_to", type: "time", isNullable: true, default: null },
          { name: "tuesday_standard_time_from", type: "time", isNullable: true, default: null },
          { name: "tuesday_standard_time_to", type: "time", isNullable: true, default: null },
          { name: "wednesday_standard_time_from", type: "time", isNullable: true, default: null },
          { name: "wednesday_standard_time_to", type: "time", isNullable: true, default: null },
          { name: "thursday_standard_time_from", type: "time", isNullable: true, default: null },
          { name: "thursday_standard_time_to", type: "time", isNullable: true, default: null },
          { name: "friday_standard_time_from", type: "time", isNullable: true, default: null },
          { name: "friday_standard_time_to", type: "time", isNullable: true, default: null },
          { name: "saturday_standard_time_from", type: "time", isNullable: true, default: null },
          { name: "saturday_standard_time_to", type: "time", isNullable: true, default: null },
          { name: "sunday_standard_time_from", type: "time", isNullable: true, default: null },
          { name: "sunday_standard_time_to", type: "time", isNullable: true, default: null },
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
    await queryRunner.dropTable("mst_area_schedule_standard");
  }
}
