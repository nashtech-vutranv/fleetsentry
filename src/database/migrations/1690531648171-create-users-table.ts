import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateUsersTable1690531648171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "inspector_flag", type: "int", default: 0 },
          { name: "lock_flag", type: "int", default: 0 },
          { name: "user_type_code", type: "varchar", isNullable: true },
          { name: "lastname", type: "varchar", length: "100", isNullable: true },
          { name: "firstname", type: "varchar", length: "100", isNullable: true },
          { name: "lastname_kana", type: "varchar", length: "100", isNullable: true },
          { name: "firstname_kana", type: "varchar", length: "100", isNullable: true },
          { name: "lastname_en", type: "varchar", length: "100", isNullable: true },
          { name: "firstname_en", type: "varchar", length: "100", isNullable: true },
          { name: "email", type: "varchar" },
          { name: "password", type: "varchar", isNullable: true, default: null },
          { name: "last_login_at", type: "timestamp", isNullable: true, default: null },
          { name: "last_pw_changed_at", type: "timestamp", isNullable: true, default: null },
          { name: "pwd_expiration_date", type: "timestamp", isNullable: true, default: null },
          { name: "date_format", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "language", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "start_program", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "timezone_code", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "deleted_at", type: "timestamp", isNullable: true, default: null },
        ],
      }),
      true,
    );

    await queryRunner.createUniqueConstraint("users", new TableUnique({ columnNames: ["email"] }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
