import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from "typeorm";

export class UpdateFkInspectionScheduleResultsTable1693361154547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      "inspection_schedule_results",
      new TableIndex({
        name: "inspection_schedule_results_unique",
        columnNames: ["order_number", "item", "seqn"],
        isUnique: true,
      }),
    );

    // fk
    await queryRunner.createForeignKey(
      "inspection_schedule_results",
      new TableForeignKey({
        name: "fk_inspection_schedule_results___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "NO ACTION",
      }),
    );
    await queryRunner.createForeignKey(
      "inspection_schedule_results",
      new TableForeignKey({
        name: "fk_inspection_schedule_results___scheduled_site_id",
        columnNames: ["scheduled_site_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sites",
        onDelete: "SET NULL",
      }),
    );
    await queryRunner.createForeignKey(
      "inspection_schedule_results",
      new TableForeignKey({
        name: "fk_inspection_schedule_results___assign_site_id",
        columnNames: ["assign_site_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sites",
        onDelete: "SET NULL",
      }),
    );
    await queryRunner.createForeignKey(
      "inspection_schedule_results",
      new TableForeignKey({
        name: "fk_inspection_schedule_results___inspected_site_id",
        columnNames: ["inspected_site_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sites",
        onDelete: "SET NULL",
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_schedule_results",
      new TableForeignKey({
        name: "fk_inspection_schedule_results___inspected_inspector_id",
        columnNames: ["inspected_inspector_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspectors",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_schedule_results",
      new TableForeignKey({
        name: "fk_inspection_schedule_results___approved_by",
        columnNames: ["approved_by"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspectors",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_schedule_results",
      new TableForeignKey({
        name: "fk_inspection_schedule_results___comment_id",
        columnNames: ["comment_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_type_comments",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_schedule_results",
      new TableForeignKey({
        name: "fk_inspection_schedule_results___reason_id",
        columnNames: ["reason_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "mst_reasons",
        onDelete: "NO ACTION",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("inspection_schedule_results", "inspection_schedule_results_unique");
    await queryRunner.dropForeignKey(
      "inspection_schedule_results",
      "fk_inspection_schedule_results___inspection_type_id",
    );
    await queryRunner.dropForeignKey(
      "inspection_schedule_results",
      "fk_inspection_schedule_results___scheduled_site_id",
    );
    await queryRunner.dropForeignKey("inspection_schedule_results", "fk_inspection_schedule_results___assign_site_id");
    await queryRunner.dropForeignKey(
      "inspection_schedule_results",
      "fk_inspection_schedule_results___inspected_site_id",
    );
    await queryRunner.dropForeignKey(
      "inspection_schedule_results",
      "fk_inspection_schedule_results___inspected_inspector_id",
    );
    await queryRunner.dropForeignKey("inspection_schedule_results", "fk_inspection_schedule_results___approved_by");
    await queryRunner.dropForeignKey("inspection_schedule_results", "fk_inspection_schedule_results___comment_id");
    await queryRunner.dropForeignKey("inspection_schedule_results", "fk_inspection_schedule_results___reason_id");
  }
}
