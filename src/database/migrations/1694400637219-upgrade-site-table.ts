import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpgradeSiteTable1694400637219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("sites", [
      new TableColumn({ name: "area_code", type: "varchar", length: "20", isNullable: true, default: null }),
    ]);

    await queryRunner.dropColumns("sites", [
      "monday_standard_time_from",
      "monday_standard_time_to",
      "tuesday_standard_time_from",
      "tuesday_standard_time_to",
      "wednesday_standard_time_from",
      "wednesday_standard_time_to",
      "thursday_standard_time_from",
      "thursday_standard_time_to",
      "friday_standard_time_from",
      "friday_standard_time_to",
      "saturday_standard_time_from",
      "saturday_standard_time_to",
      "sunday_standard_time_from",
      "sunday_standard_time_to",
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("sites", "area_code");
  }
}
