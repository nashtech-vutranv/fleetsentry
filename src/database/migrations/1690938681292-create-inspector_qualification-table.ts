import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInspectorQualificationTable1690938681292 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inspector_qualification",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "inspector_id", type: "int" },
          { name: "inspection_type_id", type: "int" },
          { name: "approval_permission_flag", type: "smallint", default: 0, comment: "1(TRUE), 0(FALSE)" },
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
    await queryRunner.dropTable("inspector_qualification");
  }

}
