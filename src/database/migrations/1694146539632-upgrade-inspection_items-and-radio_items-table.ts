import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpgradeInspectionItemsAndRadioItemsTable1694146539632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "mst_inspection_items",
      new TableColumn({
        name: "label_en",
        type: "varchar",
        isNullable: true,
        length: "100",
        default: null,
        comment: "[6] on_off",
      }),
    );

    await queryRunner.addColumn(
      "radio_items",
      new TableColumn({ name: "label_en", type: "varchar", isNullable: true, length: "100", default: null }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("mst_inspection_items", "label_en");
  }
}
