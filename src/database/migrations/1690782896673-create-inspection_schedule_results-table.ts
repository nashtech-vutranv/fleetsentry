import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInspectionScheduleResultsTable1690782896673 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "inspection_schedule_results",
        columns: [
          { name: "id", type: "int", isGenerated: true, generationStrategy: "increment", isPrimary: true },
          { name: "company_code", type: "varchar", length: "20" },
          { name: "order_number", type: "varchar", length: "100" },
          { name: "item", type: "smallint" },
          { name: "seqn", type: "smallint" },
          { name: "inspection_type_id", type: "int" },
          { name: "identification_number", type: "varchar", length: "100" },
          { name: "scheduled_at_to", type: "date", isNullable: true, default: null },
          { name: "scheduled_at_from", type: "date", isNullable: true, default: null },
          { name: "scheduled_time", type: "timestamp", isNullable: true, default: null },
          { name: "scheduled_site_id", type: "int", isNullable: true, default: null },
          { name: "scheduled_visit_site", type: "varchar", length: "100", isNullable: true, default: null }, // TODO
          { name: "assign_date", type: "date", isNullable: true, default: null },
          { name: "assign_site_id", type: "int", isNullable: true, default: null },
          {
            name: "assign_visit_site_flag",
            type: "smallint",
            isNullable: true,
            default: null,
            comment: "0. FALSE - 1.TRUE",
          },
          { name: "inspected_date", type: "date", isNullable: true, default: null },
          { name: "inspected_start_at", type: "timestamp", isNullable: true, default: null },
          { name: "inspected_done_at", type: "timestamp", isNullable: true, default: null },
          { name: "inspected_inspector_id", type: "int", isNullable: true, default: null },
          { name: "inspected_site_id", type: "int", isNullable: true, default: null },
          {
            name: "inspected_visit_site_flag",
            type: "smallint",
            isNullable: true,
            default: null,
            comment: "0. FALSE - 1.TRUE",
          },
          { name: "inspection_result", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "approved_at", type: "timestamp", isNullable: true, default: null },
          { name: "approved_by", type: "int", isNullable: true, default: null },
          {
            name: "re_inspection_flag",
            type: "smallint",
            isNullable: true,
            default: null,
            comment: "0. FALSE - 1.TRUE",
          },
          { name: "erp_send_flag", type: "smallint", isNullable: true, default: null, comment: "0. FALSE - 1.TRUE" },
          { name: "erp_send_at", type: "timestamp", isNullable: true, default: null },
          { name: "odo_distance", type: "int", isNullable: true, default: null },
          { name: "odo_distance_input_at", type: "timestamp", isNullable: true, default: null },
          { name: "sticker_number", type: "varchar", length: "100", isNullable: true, default: null },
          { name: "image_data_flag", type: "smallint", isNullable: true, default: null, comment: "0. FALSE - 1.TRUE" },
          {
            name: "coordinate_data_flag",
            type: "smallint",
            isNullable: true,
            default: null,
            comment: "0. FALSE - 1.TRUE",
          },
          { name: "reason_id", type: "int", isNullable: true, default: null }, // todo: FK
          { name: "reason_content", type: "text", isNullable: true, default: null },
          { name: "comment_id", type: "int", isNullable: true, default: null }, // todo: FK
          { name: "comment_content", type: "text", isNullable: true, default: null },
          { name: "inspection_interval", type: "time", isNullable: true, default: null },
          { name: "me_downloaded_at", type: "timestamp", isNullable: true, default: null },
          { name: "bar_code", type: "varchar", length: "100", isNullable: true, default: null },
          { name: "no_order_flag", type: "smallint", isNullable: true, default: null, comment: "0. FALSE - 1.TRUE" },
          { name: "today_flag", type: "smallint", isNullable: true, default: null, comment: "0. FALSE - 1.TRUE" },
          { name: "image_folder_url", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "airis_search_key", type: "varchar", length: "255", isNullable: true, default: null },
          { name: "draft_flag", type: "smallint", isNullable: true, default: null, comment: "0. FALSE - 1.TRUE" },
          { name: "created_by", type: "int", isNullable: true, default: null },
          { name: "updated_by", type: "int", isNullable: true, default: null },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "delete_reason_code", type: "varchar", length: "20", isNullable: true, default: null },
          { name: "deleted_at", type: "timestamp", isNullable: true, default: null },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("inspection_schedule_results");
  }
}
