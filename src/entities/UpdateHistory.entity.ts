import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from "typeorm";

@Entity({ name: "update_history" })
export class UpdateHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "order_number", type: "varchar", length: "100" })
  order_number: string;

  @Column({ name: "item", type: "varchar", length: "20", nullable: false })
  item: string;

  @Column({ name: "seqn", type: "smallint" })
  seqn: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "inspection_h_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" })
  inspection_h_flag: number;

  @Column({ name: "inspection_d_flag", type: "smallint", default: 0, comment: "0-1 - TRUE, FALSE" })
  inspection_d_flag: number;

  @Column({ name: "inspection_schedule_result_id", type: "int", nullable: false })
  inspection_schedule_result_id: number;

  @Column({ name: "coordinate_item_results_id", type: "int", nullable: false })
  coordinate_item_results_id: number;

  @Column({ name: "before_value", type: "varchar", length: "100", nullable: false })
  before_value: string;

  @Column({ name: "after_change_value", type: "varchar", length: "100", nullable: false })
  after_change_value: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
