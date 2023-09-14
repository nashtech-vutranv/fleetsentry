import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstTimeSpecifiedTypeTable1690760738376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_time_specified_types",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "site_id", type: "int" },
          { name: "inspection_type_id", type: "int" },
          // TODO: confirm - change datatype
          { name: "block_time", type: "int", isNullable: true, default: null },
          { name: "monday_available_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "monday_exception_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "tuesday_available_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "tuesday_exception_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "wednesday_available_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "wednesday_exception_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "thursday_available_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "thursday_exception_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "friday_available_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "friday_exception_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "saturday_available_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "saturday_exception_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "sunday_available_time", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "sunday_exception_time", type: "varchar", length: "20", isNullable: true, default: null },
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
    await queryRunner.dropTable("mst_time_specified_types");
  }
}
