import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTimeSpecifiedTypeTable1692023282507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "time_specified_type",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "site_id", type: "int" },
          { name: "inspection_type_id", type: "int" },
          { name: "monday_available_from", type: "time", isNullable: true, default: null },
          { name: "monday_available_to", type: "time", isNullable: true, default: null },
          { name: "monday_exception_from", type: "time", isNullable: true, default: null },
          { name: "monday_exception_to", type: "time", isNullable: true, default: null },
          { name: "tuesday_available_from", type: "time", isNullable: true, default: null },
          { name: "tuesday_available_to", type: "time", isNullable: true, default: null },
          { name: "tuesday_exception_from", type: "time", isNullable: true, default: null },
          { name: "tuesday_exception_to", type: "time", isNullable: true, default: null },
          { name: "wednesday_available_from", type: "time", isNullable: true, default: null },
          { name: "wednesday_available_to", type: "time", isNullable: true, default: null },
          { name: "wednesday_exception_from", type: "time", isNullable: true, default: null },
          { name: "wednesday_exception_to", type: "time", isNullable: true, default: null },
          { name: "thursday_available_from", type: "time", isNullable: true, default: null },
          { name: "thursday_available_to", type: "time", isNullable: true, default: null },
          { name: "thursday_exception_from", type: "time", isNullable: true, default: null },
          { name: "thursday_exception_to", type: "time", isNullable: true, default: null },
          { name: "friday_available_from", type: "time", isNullable: true, default: null },
          { name: "friday_available_to", type: "time", isNullable: true, default: null },
          { name: "friday_exception_from", type: "time", isNullable: true, default: null },
          { name: "friday_exception_to", type: "time", isNullable: true, default: null },
          { name: "saturday_available_from", type: "time", isNullable: true, default: null },
          { name: "saturday_available_to", type: "time", isNullable: true, default: null },
          { name: "saturday_exception_from", type: "time", isNullable: true, default: null },
          { name: "saturday_exception_to", type: "time", isNullable: true, default: null },
          { name: "sunday_available_from", type: "time", isNullable: true, default: null },
          { name: "sunday_available_to", type: "time", isNullable: true, default: null },
          { name: "sunday_exception_from", type: "time", isNullable: true, default: null },
          { name: "sunday_exception_to", type: "time", isNullable: true, default: null },
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
    await queryRunner.dropTable("time_specified_type");
  }
}
