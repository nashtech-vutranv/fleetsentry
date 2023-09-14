import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUserRoleTable1690533873291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_role",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "user_id", type: "int" },
          { name: "role_id", type: "int" },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );

    const tblFk1 = {
      columnNames: ["user_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE",
    };
    await queryRunner.createForeignKey("user_role", new TableForeignKey(tblFk1));

    const tblFk2 = {
      columnNames: ["role_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "roles",
      onDelete: "CASCADE",
    };
    await queryRunner.createForeignKey("user_role", new TableForeignKey(tblFk2));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_role");
  }
}
