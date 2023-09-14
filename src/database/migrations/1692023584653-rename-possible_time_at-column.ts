import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePossibleTimeAtColumn1692023584653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("time_specified_type_exception_days", "possible_time_at", "possible_time_to");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("time_specified_type_exception_days", "possible_time_to", "possible_time_at");
  }
}
