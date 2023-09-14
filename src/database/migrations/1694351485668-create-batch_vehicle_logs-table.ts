import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBatchVehicleLogsTable1694351485668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "batch_vehicle_log",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "inspection_schedule_result_id", type: "int" },
          { name: "payload", type: "jsonb", isNullable: true, default: null },
          { name: "is_condition_1", type: "smallint", isNullable: true, default: 0, comment: "Case 10 days 0.F, 1.T" },
          { name: "is_condition_2", type: "smallint", isNullable: true, default: 0, comment: "Case 45 days 0.F, 1.T" },
          { name: "new_inspection_schedule_result_id", type: "int", isNullable: true, default: null },
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
    await queryRunner.dropTable("batch_vehicle_log");
  }
}
