import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateMstTimeSpecifiedTypesTable1693359406831 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("mst_time_specified_types", "monday_exception_time_to", "monday_available_time_to");
    await queryRunner.renameColumn(
      "mst_time_specified_types",
      "tuesday_exception_time_to",
      "tuesday_available_time_to",
    );
    await queryRunner.renameColumn(
      "mst_time_specified_types",
      "wednesday_exception_time_to",
      "wednesday_available_time_to",
    );
    await queryRunner.renameColumn(
      "mst_time_specified_types",
      "thursday_exception_time_to",
      "thursday_available_time_to",
    );
    await queryRunner.renameColumn("mst_time_specified_types", "friday_exception_time_to", "friday_available_time_to");
    await queryRunner.renameColumn(
      "mst_time_specified_types",
      "saturday_exception_time_to",
      "saturday_available_time_to",
    );
    await queryRunner.renameColumn("mst_time_specified_types", "sunday_exception_time_to", "sunday_available_time_to");

    await queryRunner.addColumns("mst_time_specified_types", [
      new TableColumn({ name: "monday_exception_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "monday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "tuesday_exception_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "tuesday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "wednesday_exception_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "wednesday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "thursday_exception_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "thursday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "friday_exception_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "friday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "saturday_exception_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "saturday_exception_time_to", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "sunday_exception_time_from", type: "time", isNullable: true, default: null }),
      new TableColumn({ name: "sunday_exception_time_to", type: "time", isNullable: true, default: null }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
