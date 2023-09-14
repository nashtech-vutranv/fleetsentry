import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRolePrograms1690536129876 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role_programs",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "role_id", type: "int" },
          { name: "program_id", type: "int" },
          { name: "read_permission_flag", type: "boolean", default: false },
          { name: "create_permission_flag", type: "boolean", default: false },
          { name: "update_permission_flag", type: "boolean", default: false },
          { name: "delete_permission_flag", type: "boolean", default: false },
          { name: "download_permission_flag", type: "boolean", default: false },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );

    const tblFk1 = {
      columnNames: ["role_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "roles",
      onDelete: "CASCADE",
    };
    await queryRunner.createForeignKey("role_programs", new TableForeignKey(tblFk1));

    const tblFk2 = {
      columnNames: ["program_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "mst_programs",
      onDelete: "CASCADE",
    };
    await queryRunner.createForeignKey("role_programs", new TableForeignKey(tblFk2));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("role_programs");
  }
}
