import { MigrationInterface, QueryRunner } from "typeorm";

export class UpgradeInspectionItemsTable1694498865707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE mst_inspection_items ALTER COLUMN future_date_flag SET DEFAULT NULL;");
    await queryRunner.query("ALTER TABLE mst_inspection_items ALTER COLUMN max_future_days SET DEFAULT NULL;");
    await queryRunner.query("ALTER TABLE mst_inspection_items ALTER COLUMN past_date_flag SET DEFAULT NULL;");
    await queryRunner.query("ALTER TABLE mst_inspection_items ALTER COLUMN max_past_days SET DEFAULT NULL;");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE mst_inspection_items ALTER COLUMN future_date_flag SET DEFAULT 0;");
    await queryRunner.query("ALTER TABLE mst_inspection_items ALTER COLUMN max_future_days SET DEFAULT 0;");
    await queryRunner.query("ALTER TABLE mst_inspection_items ALTER COLUMN past_date_flag SET DEFAULT 0;");
    await queryRunner.query("ALTER TABLE mst_inspection_items ALTER COLUMN max_past_days SET DEFAULT 0;");
  }
}
