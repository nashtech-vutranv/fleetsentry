import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstLanguageLabelTable1690779775108 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_language_label",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "key", type: "varchar", length: "255" },
          { name: "label", type: "varchar", length: "255" },
          { name: "japanese", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "english", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "chinese", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "spanish", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "vietnamese", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "mobile_flag", type: "smallint", isNullable: true, default: 0 },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("mst_language_label");
  }
}
