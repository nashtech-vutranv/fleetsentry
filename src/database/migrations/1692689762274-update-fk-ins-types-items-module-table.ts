import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from "typeorm";

/**
 * 1. mst_inspection_items
 * 1.1. radio_items
 * 2. inspection_types
 * 3. inspection_type_item
 * 4. tabs - tab-items
 */
export class UpdateFkInsTypesItemsModuleTable1692689762274 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. mst_inspection_items
    await queryRunner.createIndex(
      "mst_inspection_items",
      new TableIndex({
        name: "mst_inspection_items_unique",
        columnNames: ["company_code", "name"],
        isUnique: true,
        where: "deleted_at IS NULL",
      }),
    );
    // 1.1. radio_items : unique - fk
    await queryRunner.createIndex(
      "radio_items",
      new TableIndex({
        name: "radio_items_unique",
        columnNames: ["inspection_item_id", "value"],
        isUnique: true,
      }),
    );
    await queryRunner.createForeignKey(
      "radio_items",
      new TableForeignKey({
        name: "fk_radio_items___inspection_item_id",
        columnNames: ["inspection_item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "mst_inspection_items",
        onDelete: "CASCADE",
      }),
    );


    // 2. inspection_types
    await queryRunner.createIndex(
      "inspection_types",
      new TableIndex({
        name: "inspection_types_unique",
        columnNames: ["company_code", "inspection_code"],
        isUnique: true,
        where: "deleted_at IS NULL",
      }),
    );

    // 3. inspection_type_item
    await queryRunner.createForeignKey(
      "inspection_type_item",
      new TableForeignKey({
        name: "fk_inspection_type_item___inspection_item_id",
        columnNames: ["inspection_item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "mst_inspection_items",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createForeignKey(
      "inspection_type_item",
      new TableForeignKey({
        name: "fk_inspection_type_item___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "NO ACTION",
      }),
    );

    await queryRunner.createIndex(
      "inspection_type_item",
      new TableIndex({
        name: "inspection_type_item_unique",
        columnNames: ["inspection_type_id", "inspection_item_id"],
        isUnique: true,
      }),
    );

    // 4. tabs - tab-items
    // 4.1. tabs : fk-UNIQUE
    await queryRunner.createForeignKey(
      "tabs",
      new TableForeignKey({
        name: "fk_tabs___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "tabs",
      new TableForeignKey({
        name: "fk_tabs___drawing_id",
        columnNames: ["drawing_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "drawings",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createIndex(
      "tabs",
      new TableIndex({
        name: "tabs_unique",
        columnNames: ["inspection_type_id", "name"],
        isUnique: true,
      }),
    );

    // 4.2. tab_items : fk-unique
    await queryRunner.createForeignKey(
      "tab_items",
      new TableForeignKey({
        name: "fk_tab_items___inspection_type_id",
        columnNames: ["inspection_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "inspection_types",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "tab_items",
      new TableForeignKey({
        name: "fk_tab_items___inspection_item_id",
        columnNames: ["inspection_item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "mst_inspection_items",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "tab_items",
      new TableForeignKey({
        name: "fk_tab_items___tab_id",
        columnNames: ["tab_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "tabs",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createIndex(
      "tab_items",
      new TableIndex({
        name: "tab_item_unique",
        columnNames: ["inspection_item_id", "tab_id"],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. mst_inspection_items
    await queryRunner.dropIndex("mst_inspection_items", "mst_inspection_items_unique");

    // 1.1. radio_items
    await queryRunner.dropIndex("radio_items", "radio_items_unique");
    await queryRunner.dropForeignKey("radio_items", "fk_radio_items___inspection_item_id");

    // 2. inspection_types
    await queryRunner.dropIndex("inspection_types", "inspection_types_unique");

    // 3. inspection_type_item
    await queryRunner.dropForeignKey("inspection_type_item", "fk_inspection_type_item___inspection_item_id");
    await queryRunner.dropForeignKey("inspection_type_item", "fk_inspection_type_item___inspection_type_id");
    await queryRunner.dropIndex("inspection_type_item", "inspection_type_item_unique");

    // 4. tabs - tab-items
    // 4.1.
    await queryRunner.dropForeignKey("tabs", "fk_tabs___inspection_type_id");
    await queryRunner.dropForeignKey("tabs", "fk_tabs___drawing_id");
    await queryRunner.dropIndex("tabs", "tabs_unique");

    // 4.2.
    await queryRunner.dropForeignKey("tab_items", "fk_tab_items___inspection_type_id");
    await queryRunner.dropForeignKey("tab_items", "fk_tab_items___inspection_item_id");
    await queryRunner.dropForeignKey("tab_items", "fk_tab_items___tab_id");
    await queryRunner.dropIndex("tab_items", "tab_item_unique");
  }
}
