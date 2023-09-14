import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

/**
 * @author vungpv93@gmail.com
 * @description
 * - upgrade users table
 * + default_keyboard
 * + phone_number
 */
export class UpgradeUsersTable1694156859052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "default_keyboard",
        type: "varchar",
        length: "100",
        isNullable: true,
        default: null,
      }),
    );

    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "phone_number",
        type: "varchar",
        length: "20",
        isNullable: true,
        default: null,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "default_keyboard");
    await queryRunner.dropColumn("users", "phone_number");
  }
}
