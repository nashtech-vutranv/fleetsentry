import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpgradeInspectionScheduleResultsTable1694573923904 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "inspection_schedule_results",
      new TableColumn({ name: "is_current", type: "smallint", isNullable: true, default: null, comment: "1.Y-0.N" }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("inspection_schedule_results", "is_current");
  }
}
