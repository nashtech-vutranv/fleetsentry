import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMailTemplatesTable1691052506798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mail_templates",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "name", type: "varchar", isNullable: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "program_id", type: "int" },
          { name: "subject", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "content", type: "text", isNullable: true, default: null },
          { name: "default_flag", type: "smallint", isNullable: true, default: 0, comment: "0.FALSE - 1.TRUE" },
          { name: "consignee_send_flag", type: "smallint", isNullable: true, default: 0, comment: "0.FALSE - 1.TRUE" },
          { name: "accountee_send_flag", type: "smallint", isNullable: true, default: 0, comment: "0.FALSE - 1.TRUE" },
          { name: "applicant_send_flag", type: "smallint", isNullable: true, default: 0, comment: "0.FALSE - 1.TRUE" },
          { name: "receiving_sending_flag", type: "smallint", isNullable: true, default: 0, comment: "FALSE-TRUE" },
          { name: "email_address_1", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "email_address_2", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "email_address_3", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "email_address_4", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "email_address_5", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "email_address_6", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "cc_email_address_1", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "cc_email_address_2", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "cc_email_address_3", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "cc_email_address_4", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "cc_email_address_5", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "cc_email_address_6", type: "varchar", length: "255", isNullable: true, default: null },
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
    await queryRunner.dropTable("mail_templates");
  }
}
