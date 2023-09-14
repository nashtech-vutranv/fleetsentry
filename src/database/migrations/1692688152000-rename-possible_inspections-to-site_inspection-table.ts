import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePossibleInspectionsToSiteInspectionTable1692688152000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("possible_inspections", "site_inspection_type");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("site_inspection_type", "possible_inspections");
  }
}
