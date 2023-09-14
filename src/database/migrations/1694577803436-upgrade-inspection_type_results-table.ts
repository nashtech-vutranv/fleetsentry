import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class UpgradeInspectionTypeResultsTable1694577803436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("inspection_type_results", [
      new TableColumn({ name: "certificate_id", type: "int", isNullable: true, default: null }),
      new TableColumn({ name: "mail_template_id", type: "int", isNullable: true, default: null }),
    ]);

    await queryRunner.createIndex(
      "inspection_type_results",
      new TableIndex({
        name: "inspection_type_result_unique",
        columnNames: ["inspection_type_id", "inspection_result_code"],
        isUnique: true,
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_type_results",
      new TableForeignKey({
        name: "fk_inspection_type_results___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_type_results",
      new TableForeignKey({
        name: "fk_inspection_type_results___mail_template_id",
        columnNames: ["mail_template_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "mail_templates",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_type_results",
      new TableForeignKey({
        name: "fk_inspection_type_results___mail_certificate_id",
        columnNames: ["certificate_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "certificates",
        onDelete: "NO ACTION",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("inspection_type_results", "certificate_id");
    await queryRunner.dropColumn("inspection_type_results", "mail_template_id");
  }
}
