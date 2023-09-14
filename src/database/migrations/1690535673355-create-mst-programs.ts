import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstPrograms1690535673355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_programs",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "read_permission_flag", type: "boolean", default: false },
          { name: "create_permission_flag", type: "boolean", default: false },
          { name: "update_permission_flag", type: "boolean", default: false },
          { name: "delete_permission_flag", type: "boolean", default: false },
          { name: "download_permission_flag", type: "boolean", default: false },
          { name: "program_name", type: "varchar", length: "255" },
          { name: "program_name_en", type: "varchar", length: "255", isNullable: true },
          { name: "program_number", type: "varchar", length: "50" },
          { name: "system_flag", type: "boolean", default: false },
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
    await queryRunner.dropTable("mst_programs");
  }
}
