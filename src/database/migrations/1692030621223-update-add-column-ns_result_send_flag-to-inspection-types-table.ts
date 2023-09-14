import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateAddColumnNsResultSendFlagToInspectionTypesTable1692030621223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "inspection_types",
      new TableColumn({ name: "ns_result_send_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("inspection_types", "ns_result_send_flag");
  }
}
