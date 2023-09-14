import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMstReasonsTable1691657456873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "mst_reasons",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "inspection_type_id", type: "int" },
          { name: "inspection_result_code", type: "varchar", length: "20", isNullable: true },
          { name: "name", type: "varchar", length: "100" }, // GenericCode
          { name: "content", type: "text", isNullable: true },
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
    await queryRunner.dropTable("mst_reasons");
  }
}
