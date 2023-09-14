import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateNakInformationTable1691281786523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "nak_information",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "send_at", type: "timestamp", isNullable: true },
          { name: "send_distance", type: "int", isNullable: true },
          { name: "inspection_type_id", type: "int" },
          { name: "original_distance", type: "int", isNullable: true },
          { name: "original_measurement_at", type: "timestamp", isNullable: true },
          { name: "auction_site", type: "varchar", length: "255", isNullable: true },
          { name: "sender_id", type: "int" },
          { name: "identification_number", type: "varchar", length: "100" },
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
    await queryRunner.dropTable("nak_information");
  }
}
