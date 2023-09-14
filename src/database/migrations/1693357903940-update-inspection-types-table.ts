import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateInspectionTypesTable1693357903940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "inspection_types",
      "category_code",
      new TableColumn({ name: "category_code", type: "varchar", length: "20", isNullable: true, default: null }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "group_code",
      new TableColumn({ name: "group_code", type: "varchar", length: "20", isNullable: true, default: null }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "inspection_assign_method",
      new TableColumn({
        name: "inspection_assign_method",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "1-2 (D日付,T時間)",
      }),
    );

    await queryRunner.changeColumn(
      "inspection_types",
      "visit_able_flag",
      new TableColumn({
        name: "visit_able_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );

    await queryRunner.changeColumn(
      "inspection_types",
      "certificate_issue_flag",
      new TableColumn({
        name: "certificate_issue_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );

    await queryRunner.changeColumn(
      "inspection_types",
      "re_inspection_able_flag",
      new TableColumn({
        name: "re_inspection_able_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "re_inspection_assign_method",
      new TableColumn({ name: "re_inspection_assign_method", type: "smallint", isNullable: true, default: null }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "self_assignable_flag",
      new TableColumn({
        name: "self_assignable_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "en_input_flag",
      new TableColumn({
        name: "en_input_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "certificate_delivery_flag",
      new TableColumn({
        name: "certificate_delivery_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "external_inspector_flag",
      new TableColumn({
        name: "external_inspector_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "interval_flag_1",
      new TableColumn({
        name: "interval_flag_1",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "interval_flag_2",
      new TableColumn({
        name: "interval_flag_2",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "qc_flag",
      new TableColumn({
        name: "qc_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
    await queryRunner.changeColumn(
      "inspection_types",
      "ns_result_send_flag",
      new TableColumn({
        name: "ns_result_send_flag",
        type: "smallint",
        isNullable: true,
        default: null,
        comment: "0-1 - TRUE, FALSE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
