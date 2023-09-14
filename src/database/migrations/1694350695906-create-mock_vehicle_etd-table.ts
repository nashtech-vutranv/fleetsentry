import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMockVehicleEtdTable1694350695906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mock_vehicle_etd",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "identification_number", type: "varchar", length: "100" },
          { name: "date", type: "date", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("mock_vehicle_etd");
  }
}
