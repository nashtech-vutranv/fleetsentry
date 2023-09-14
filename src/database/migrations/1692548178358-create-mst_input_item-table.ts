import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstInputItemTable1692548178358 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_input_item",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "input_field_name", type: "varchar", length: "20" },
          { name: "data_type", type: "varchar", length: "20" },
          { name: "minimum_digit_length", type: "int", isNullable: false, default: 0 },
          { name: "maximum_digit_length", type: "int", isNullable: false },
          { name: "past_date_possible", type: "timestamp", isNullable: true, default: null },
          { name: "future_date_possible", type: "timestamp", isNullable: true, default: null },
          { name: "list_key_code", type: "jsonb", isArray: true, isNullable: true },
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
    await queryRunner.dropTable("mst_input_item");
  }
}
