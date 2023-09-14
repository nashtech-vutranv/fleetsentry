import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

/**
 * 1. generic_code_unique
 * 2. mst_system_parameter
 * 3. mst_language_label
 */
export class UpdateFkUniqueGenericCodeTable1692679520408 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. generic_code_unique
    await queryRunner.createUniqueConstraint(
      "mst_generic_code",
      new TableUnique({
        name: "generic_code_unique",
        columnNames: ["company_code", "language", "key_type", "key_value"],
      }),
    );

    // 2. generic_code_unique
    await queryRunner.createUniqueConstraint(
      "mst_system_parameter",
      new TableUnique({
        name: "system_parameter_unique",
        columnNames: ["company_code", "name"],
      }),
    );

    // 3. mst_language_label
    await queryRunner.createUniqueConstraint(
      "mst_language_label",
      new TableUnique({
        name: "mst_language_label_key_unique",
        columnNames: ["company_code", "key"],
      }),
    );
    await queryRunner.createUniqueConstraint(
      "mst_language_label",
      new TableUnique({
        name: "mst_language_label_label_unique",
        columnNames: ["company_code", "label"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. generic_code_unique
    await queryRunner.dropUniqueConstraint("mst_generic_code", "generic_code_unique");

    // 2. generic_code_unique
    await queryRunner.dropUniqueConstraint("mst_system_parameter", "system_parameter_unique");

    // 3. mst_language_label
    await queryRunner.dropUniqueConstraint("mst_language_label", "mst_language_label_key_unique");
    await queryRunner.dropUniqueConstraint("mst_language_label", "mst_language_label_label_unique");
  }
}
