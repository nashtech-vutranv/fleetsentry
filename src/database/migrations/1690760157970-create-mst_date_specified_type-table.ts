import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstDateSpecifiedTypeTable1690760157970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_date_specified_types",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "site_id", type: "int" },
          { name: "inspection_type_id", type: "int" },
          { name: "monday_available_count", type: "smallint", default: 0 },
          { name: "tuesday_available_count", type: "smallint", default: 0 },
          { name: "wednesday_available_count", type: "smallint", default: 0 },
          { name: "thursday_available_count", type: "smallint", default: 0 },
          { name: "friday_available_count", type: "smallint", default: 0 },
          { name: "saturday_available_count", type: "smallint", default: 0 },
          { name: "sunday_available_count", type: "smallint", default: 0 },
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
    await queryRunner.dropTable("mst_date_specified_types");
  }
}
