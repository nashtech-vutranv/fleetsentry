import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateMstTimeSpecifiedTypesTable1693196081165 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("mst_time_specified_types", [
      "monday_available_time",
      "monday_exception_time",
      "tuesday_available_time",
      "tuesday_exception_time",
      "wednesday_available_time",
      "wednesday_exception_time",
      "thursday_available_time",
      "thursday_exception_time",
      "friday_available_time",
      "friday_exception_time",
      "saturday_available_time",
      "saturday_exception_time",
      "sunday_available_time",
      "sunday_exception_time",
    ]);

    await queryRunner.addColumns("mst_time_specified_types", [
      new TableColumn({ name: "monday_available_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "monday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "tuesday_available_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "tuesday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "wednesday_available_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "wednesday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "thursday_available_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "thursday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "friday_available_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "friday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "saturday_available_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "saturday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "sunday_available_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "sunday_exception_time_to", type: "time", isNullable: true, default: null }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
