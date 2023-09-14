import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpgradeSitesTable1693994471148 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("sites", [
      "monday_standard_time",
      "tuesday_standard_time",
      "wednesday_standard_time",
      "thursday_standard_time",
      "friday_standard_time",
      "saturday_standard_time",
      "sunday_standard_time",
    ]);

    await queryRunner.addColumns("sites", [
      new TableColumn({ name: "monday_standard_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "monday_standard_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "tuesday_standard_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "tuesday_standard_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "wednesday_standard_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "wednesday_standard_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "thursday_standard_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "thursday_standard_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "friday_standard_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "friday_standard_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "saturday_standard_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "saturday_standard_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "sunday_standard_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "sunday_standard_time_to", type: "time", isNullable: true, default: null }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
