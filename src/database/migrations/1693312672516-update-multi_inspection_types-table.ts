import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from "typeorm";

export class UpdateMultiInspectionTypesTable1693312672516 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("multi_inspection_types", new TableColumn({ name: "inspection_type_id", type: "int" }));
    await queryRunner.addColumn(
      "multi_inspection_types",
      new TableColumn({ name: "key_types", type: "varchar", length: "20" }),
    );
    await queryRunner.dropColumn("multi_inspection_types", "inspection_name");

    await queryRunner.createForeignKey(
      "multi_inspection_types",
      new TableForeignKey({
        name: "fk_multi_inspection_types___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "multi_inspection_types",
      new TableForeignKey({
        name: "fk_multi_inspection_types___inspection_type_id_1",
        columnNames: ["inspection_type_id_1"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "multi_inspection_types",
      new TableForeignKey({
        name: "fk_multi_inspection_types___inspection_type_id_2",
        columnNames: ["inspection_type_id_2"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createIndex(
      "multi_inspection_types",
      new TableIndex({
        name: "multi_inspection_types_unique",
        columnNames: ["company_code", "key_types"],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("multi_inspection_types", ["inspection_type_id", "key_types"]);
    await queryRunner.dropForeignKey("multi_inspection_types", "fk_multi_inspection_types___inspection_type_id");
    await queryRunner.dropForeignKey("multi_inspection_types", "fk_multi_inspection_types___inspection_type_id_1");
    await queryRunner.dropForeignKey("multi_inspection_types", "fk_multi_inspection_types___inspection_type_id_2");
    await queryRunner.dropIndex("multi_inspection_types", "multi_inspection_types_unique");
  }
}
