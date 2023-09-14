import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSites1690757827198 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "sites",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "name", type: "varchar", length: "255" },
          { name: "name_en", type: "varchar", length: "255", isNullable: true },
          { name: "address", type: "varchar", length: "255", isNullable: true },
          { name: "address_en", type: "varchar", length: "255", isNullable: true },
          { name: "possible_inspection_id", type: "int", isNullable: true },
          { name: "default_sales_office_code", type: "varchar", length: "20", isNullable: true },
          { name: "contact_person", type: "varchar", length: "100", isNullable: true },
          { name: "email_address", type: "varchar", length: "255", isNullable: true },
          { name: "remarks", type: "varchar", length: "255", isNullable: true },
          { name: "aei_number", type: "varchar", length: "100", isNullable: true },
          { name: "monday_standard_time", type: "varchar", length: "50", isNullable: true },
          { name: "tuesday_standard_time", type: "varchar", length: "50", isNullable: true },
          { name: "wednesday_standard_time", type: "varchar", length: "50", isNullable: true },
          { name: "thursday_standard_time", type: "varchar", length: "50", isNullable: true },
          { name: "friday_standard_time", type: "varchar", length: "50", isNullable: true },
          { name: "saturday_standard_time", type: "varchar", length: "50", isNullable: true },
          { name: "sunday_standard_time", type: "varchar", length: "50", isNullable: true },
          { name: "main_flag", type: "smallint", isNullable: true, default: null, comment: "0.FALSE - 1.TRUE" },
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
    await queryRunner.dropTable("sites");
  }
}
