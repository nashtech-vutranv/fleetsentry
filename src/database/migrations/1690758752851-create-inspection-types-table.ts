import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInspectionTypesTable1690758752851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inspection_types",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "inspection_code", type: "varchar", length: "20" },
          { name: "inspection_description", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "category_code", type: "varchar", length: "20" },
          { name: "group_code", type: "varchar", length: "20" },
          { name: "inspection_assign_method", type: "smallint", default: 1, comment: "1-2 (D日付,T時間)" },
          { name: "visit_able_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "certificate_issue_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "re_inspection_able_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "re_inspection_assign_method", type: "smallint", default: 1 },
          { name: "self_assignable_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "estimated_time", type: "time", isNullable: true, default: null },
          { name: "manifest_type", type: "varchar", isNullable: true, default: null },
          { name: "en_input_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "certificate_delivery_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "external_inspector_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "interval_flag_1", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "interval_flag_2", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "qc_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" },
          { name: "number_of_interval", type: "smallint", isNullable: true, default: null },
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
    await queryRunner.dropTable("inspection_types");
  }
}
