import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateAddColumnModeToInspectionTypesTable1692024570903 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "inspection_types",
      new TableColumn({ name: "mode", type: "int", isNullable: false, default: 1, comment: "1. Single - 2. Combine" }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("inspection_types", "mode");
  }
}
