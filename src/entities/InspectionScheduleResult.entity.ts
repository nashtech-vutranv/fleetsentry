import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";

@Entity({ name: "inspection_schedule_results" })
export class InspectionScheduleResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "order_number", type: "varchar", length: 20, nullable: false })
  order_number: string;

  @Column({ name: "item", type: "smallint", nullable: false })
  item: number;

  @Column({ name: "seqn", type: "smallint", nullable: false })
  seqn: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "identification_number", type: "varchar", length: 100, nullable: false })
  identification_number: string;

  @Column({ name: "is_current", type: "smallint", nullable: true, default: null })
  is_current: number;

  @Column({ name: "scheduled_at_from", type: "date", nullable: true, default: null })
  scheduled_at_from: string;

  @Column({ name: "scheduled_at_to", type: "date", nullable: true, default: null })
  scheduled_at_to: string;

  @Column({ name: "scheduled_time", type: "timestamp", nullable: true, default: null })
  scheduled_time: string;

  @Column({ name: "scheduled_site_id", type: "int", nullable: true, default: null })
  scheduled_site_id: number;

  @Column({ name: "scheduled_visit_site", type: "varchar", length: 100, nullable: true, default: null })
  scheduled_visit_site: string;

  @Column({ name: "assign_date", type: "date", nullable: true, default: null })
  assign_date: string;

  @Column({ name: "assign_site_id", type: "int", nullable: true, default: null })
  assign_site_id: number;

  @Column({ name: "assign_visit_site_flag", type: "smallint", nullable: true, default: null })
  assign_visit_site_flag: number;

  @Column({ name: "inspected_date", type: "date", nullable: true, default: null })
  inspected_date: string;

  @Column({ name: "inspected_start_at", type: "timestamp", nullable: true, default: null })
  inspected_start_at: string;

  @Column({ name: "inspected_done_at", type: "timestamp", nullable: true, default: null })
  inspected_done_at: string;

  @Column({ name: "inspected_inspector_id", type: "int", nullable: true, default: null })
  inspected_inspector_id: number;

  @Column({ name: "inspected_site_id", type: "int", nullable: true, default: null })
  inspected_site_id: number;

  @Column({ name: "inspected_visit_site_flag", type: "smallint", nullable: true, default: null })
  inspected_visit_site_flag: number;

  @Column({ name: "inspection_result", type: "varchar", length: 20, nullable: false })
  inspection_result: string;

  @Column({ name: "approved_at", type: "timestamp", nullable: true, default: null })
  approved_at: string;

  @Column({ name: "approved_by", type: "int", nullable: true, default: null })
  approved_by: number;

  @Column({ name: "re_inspection_flag", type: "smallint", nullable: true, default: null })
  re_inspection_flag: number;

  @Column({ name: "erp_send_flag", type: "smallint", nullable: true, default: null })
  erp_send_flag: number;

  @Column({ name: "erp_send_at", type: "timestamp", nullable: true, default: null })
  erp_send_at: string;

  @Column({ name: "odo_distance", type: "int", nullable: true, default: null })
  odo_distance: number;

  @Column({ name: "odo_distance_input_at", type: "timestamp", nullable: true, default: null })
  odo_distance_input_at: string;

  @Column({ name: "sticker_number", type: "varchar", length: 100, nullable: false })
  sticker_number: string;

  @Column({ name: "image_data_flag", type: "smallint", nullable: true, default: null })
  image_data_flag: number;

  @Column({ name: "coordinate_data_flag", type: "smallint", nullable: true, default: null })
  coordinate_data_flag: number;

  @Column({ name: "reason_id", type: "int", nullable: true, default: null })
  reason_id: number;

  @Column({ name: "reason_content", type: "text", nullable: true, default: null })
  reason_content: string;

  @Column({ name: "comment_id", type: "int", nullable: true, default: null })
  comment_id: number;

  @Column({ name: "comment_content", type: "text", nullable: true, default: null })
  comment_content: string;

  @Column({ name: "inspection_interval", type: "time", nullable: true, default: null })
  inspection_interval: string;

  @Column({ name: "me_downloaded_at", type: "timestamp", nullable: true, default: null })
  me_downloaded_at: string;

  @Column({ name: "bar_code", type: "varchar", length: 100, nullable: true, default: null })
  bar_code: string;

  @Column({ name: "no_order_flag", type: "smallint", nullable: true, default: null })
  no_order_flag: number;

  @Column({ name: "today_flag", type: "smallint", nullable: true, default: null })
  today_flag: number;

  @Column({ name: "image_folder_url", type: "varchar", length: 255, nullable: true, default: null })
  image_folder_url: string;

  @Column({ name: "airis_search_key", type: "varchar", length: 255, nullable: true, default: null })
  airis_search_key: string;

  @Column({ name: "draft_flag", type: "smallint", nullable: true, default: null })
  draft_flag: number;

  //  ========================================================================================
  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true, default: null })
  deleted_at: string;
}
