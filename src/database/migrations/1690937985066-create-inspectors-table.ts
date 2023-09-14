import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInspectorsTable1690937985066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inspectors",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "user_id", type: "int" },
          { name: "inspector_type_code", type: "varchar", isNullable: true, length: "20" },
          { name: "visit_able_flag", type: "smallint", isNullable: true, default: 0, comment: "1(TRUE), 0(FALSE)" },
          { name: "internal_inspector_flag", type: "smallint", default: 1, comment: "1(TRUE), 0(FALSE)" },
          { name: "default_keyboard_array", type: "varchar", isNullable: true, default: null },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "deleted_at", type: "timestamp", isNullable: true, default: null },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("inspectors");
  }
}
