import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateAddColumnMstCarBodyTypeTable1692930655314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "mst_car_body_type",
      new TableColumn({ name: "measurement_mode", type: "varchar", length: "255", isNullable: true, default: null }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("mst_car_body_type", "measurement_mode");
  }
}
