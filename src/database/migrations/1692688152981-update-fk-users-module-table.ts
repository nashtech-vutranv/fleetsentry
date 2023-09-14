import { MigrationInterface, QueryRunner, TableForeignKey, TableIndex } from "typeorm";

/**
 * 1. User - Unique Email
 * 2. Role.
 * 3. Role Programs
 * 4. User Role.
 * 5. Program.
 */
export class UpdateFkUsersModuleTable1692688152981 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. User - Unique Email
    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "user_email_unique",
        columnNames: ["email"],
        isUnique: true,
        where: "deleted_at IS NULL",
      }),
    );

    // 2. Role.
    await queryRunner.createIndex(
      "roles",
      new TableIndex({
        name: "role_company_code_name_unique",
        columnNames: ["company_code", "name"],
        isUnique: true,
      }),
    );

    // 3. Role Programs
    await queryRunner.createIndex(
      "role_programs",
      new TableIndex({
        name: "role_program_unique",
        columnNames: ["role_id", "program_id"],
        isUnique: true,
      }),
    );
    await queryRunner.createForeignKey(
      "role_programs",
      new TableForeignKey({
        name: "fk_role_programs___role_id",
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "role_programs",
      new TableForeignKey({
        name: "fk_role_programs___program_id",
        columnNames: ["program_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "mst_programs",
        onDelete: "CASCADE",
      }),
    );

    // 4. User Role
    await queryRunner.createIndex(
      "user_role",
      new TableIndex({
        name: "user_role_unique",
        columnNames: ["user_id", "role_id"],
        isUnique: true,
      }),
    );
    await queryRunner.createForeignKey(
      "user_role",
      new TableForeignKey({
        name: "fk_user_role___role_id",
        columnNames: ["role_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "roles",
        onDelete: "CASCADE",
      }),
    );
    await queryRunner.createForeignKey(
      "user_role",
      new TableForeignKey({
        name: "fk_user_role___user_id",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createIndex("mst_programs", new TableIndex({
      name: "programs_number_unique",
      columnNames: ["program_number"],
      isUnique: true,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("users", "user_email_unique");
    await queryRunner.dropUniqueConstraint("role_name_unique", "role_company_code_name_unique");
    // 3. Role Programs
    await queryRunner.dropIndex("role_programs", "role_program_unique");
    await queryRunner.dropForeignKey("role_programs", "fk_role_programs___role_id");
    await queryRunner.dropForeignKey("role_programs", "fk_role_programs___program_id");
    await queryRunner.dropIndex("user_role", "user_role_unique");
    await queryRunner.dropForeignKey("user_role", "fk_user_role___role_id");
    await queryRunner.dropForeignKey("user_role", "fk_user_role___user_id");
  }
}
