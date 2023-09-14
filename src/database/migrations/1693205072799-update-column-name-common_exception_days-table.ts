import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnNameCommonExceptionDaysTable1693205072799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("common_exception_days", "possible_time_at", "possible_time_to");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("common_exception_days", "possible_time_to", "possible_time_at");
  }
}
