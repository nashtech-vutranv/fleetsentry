import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from "typeorm";

/**
 * 1. sites
 * 2. site_inspection_type
 * 3. date_specified_type_exception_days
 * 3. mst_date_specified_types
 * 4. time_specified_type_exception_days
 * 4. mst_time_specified_types
 */
export class UpdateFkSitesModuleTable1693174577601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. sites
    await queryRunner.createIndex(
      "sites",
      new TableIndex({
        name: "site_name_unique",
        columnNames: ["company_code", "name"],
        isUnique: true,
        where: "deleted_at IS NULL",
      }),
    );

    // 2. site_inspection_type
    await queryRunner.createIndex(
      "site_inspection_type",
      new TableIndex({
        name: "site_inspection_type_unique",
        columnNames: ["site_id", "inspection_type_id"],
        isUnique: true,
      }),
    );

    await queryRunner.createForeignKey(
      "site_inspection_type",
      new TableForeignKey({
        name: "fk_site_inspection_type___site_id",
        columnNames: ["site_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sites",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "site_inspection_type",
      new TableForeignKey({
        name: "fk_site_inspection_type___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );

    // 3.1. date_specified_type_exception_days
    await queryRunner.createIndex(
      "date_specified_type_exception_days",
      new TableIndex({
        name: "date_specified_type_exception_day_unique",
        columnNames: ["site_id", "inspection_type_id", "date"],
        isUnique: true,
      }),
    );
    await queryRunner.createForeignKey(
      "date_specified_type_exception_days",
      new TableForeignKey({
        name: "fk_date_specified_type_exception_days___site_id",
        columnNames: ["site_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sites",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "date_specified_type_exception_days",
      new TableForeignKey({
        name: "fk_date_specified_type_exception_days___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );

    // 3.2. mst_date_specified_types_unique
    await queryRunner.createIndex(
      "mst_date_specified_types",
      new TableIndex({
        name: "mst_date_specified_types_unique",
        columnNames: ["site_id", "inspection_type_id"],
        isUnique: true,
      }),
    );

    await queryRunner.createForeignKey(
      "mst_date_specified_types",
      new TableForeignKey({
        name: "fk_mst_date_specified_types___site_id",
        columnNames: ["site_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sites",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "mst_date_specified_types",
      new TableForeignKey({
        name: "fk_mst_date_specified_types___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );

    // 4.1. time_specified_type_exception_days
    await queryRunner.createIndex(
      "time_specified_type_exception_days",
      new TableIndex({
        name: "time_specified_type_exception_days_unique",
        columnNames: ["site_id", "inspection_type_id", "date"],
        isUnique: true,
      }),
    );
    await queryRunner.createForeignKey(
      "time_specified_type_exception_days",
      new TableForeignKey({
        name: "fk_time_specified_type_exception_days___site_id",
        columnNames: ["site_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sites",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "time_specified_type_exception_days",
      new TableForeignKey({
        name: "fk_time_specified_type_exception_days___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );

    // 4.2. mst_time_specified_types
    await queryRunner.createIndex(
      "mst_time_specified_types",
      new TableIndex({
        name: "mst_time_specified_type_unique",
        columnNames: ["site_id", "inspection_type_id"],
        isUnique: true,
      }),
    );
    await queryRunner.createForeignKey(
      "mst_time_specified_types",
      new TableForeignKey({
        name: "fk_mst_time_specified_types___site_id",
        columnNames: ["site_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "sites",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "mst_time_specified_types",
      new TableForeignKey({
        name: "fk_mst_time_specified_types___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. sites
    await queryRunner.dropIndex("sites", "site_name_unique");
    // 2. site_inspection_type
    await queryRunner.dropIndex("site_inspection_type", "site_inspection_type_unique");
    await queryRunner.dropForeignKey("site_inspection_type", "fk_site_inspection_type___site_id");
    await queryRunner.dropForeignKey("site_inspection_type", "fk_site_inspection_type___inspection_type_id");

    // 3.1. date_specified_type_exception_days
    await queryRunner.dropIndex("date_specified_type_exception_days", "date_specified_type_exception_day_unique");
    await queryRunner.dropForeignKey("site_inspection_type", "fk_date_specified_type_exception_days___site_id");
    await queryRunner.dropForeignKey("site_inspection_type", "fk_date_specified_type_exception_days___inspection_type_id");

    // 3.2. mst_date_specified_types
    await queryRunner.dropIndex("mst_date_specified_types", "mst_date_specified_types_unique");
    await queryRunner.dropForeignKey("mst_date_specified_types", "fk_mst_date_specified_types___site_id");
    await queryRunner.dropForeignKey("mst_date_specified_types", "fk_mst_date_specified_types___inspection_type_id");

    // 4.1. time_specified_type_exception_days
    await queryRunner.dropIndex("time_specified_type_exception_days", "time_specified_type_exception_days_unique");
    await queryRunner.dropForeignKey("time_specified_type_exception_days", "fk_time_specified_type_exception_days___site_id");
    await queryRunner.dropForeignKey("time_specified_type_exception_days", "fk_time_specified_type_exception_days___inspection_type_id");
    // 4.2. mst_time_specified_types
    await queryRunner.dropIndex("mst_time_specified_types", "mst_time_specified_type_unique");
    await queryRunner.dropForeignKey("mst_time_specified_types", "fk_mst_time_specified_types___site_id");
    await queryRunner.dropForeignKey("mst_time_specified_types", "fk_mst_time_specified_types___inspection_type_id");
  }
}
