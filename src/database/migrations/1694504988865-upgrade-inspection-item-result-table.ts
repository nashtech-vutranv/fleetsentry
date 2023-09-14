import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpgradeInspectionItemResultTable1694504988865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "inspection_item_results",
      new TableColumn({ name: "payload", type: "jsonb", isNullable: true, default: null }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("inspection_item_results", "payload");
  }
}
