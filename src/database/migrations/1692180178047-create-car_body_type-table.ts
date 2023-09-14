import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarBodyTypeTable1692180178047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_car_body_type",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20", isNullable: false }, // GenericCode
          { name: "type_of_model", type: "varchar", length: "100", isNullable: true, default: null },
          { name: "maker", type: "varchar", length: "20", isNullable: false }, // GenericCode
          { name: "type_classification_start", type: "int", isNullable: true, default: null },
          { name: "type_classification_end", type: "int", isNullable: true, default: null },
          { name: "car_model_lower_limit", type: "int", isNullable: true, default: null },
          { name: "car_model_upper_limit", type: "int", isNullable: true, default: null },
          { name: "fuel", type: "decimal", precision: 4, scale: 2, isNullable: true, default: null },
          { name: "co2", type: "int", isNullable: true, default: null },
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
    await queryRunner.dropTable("mst_car_body_type");
  }
}
