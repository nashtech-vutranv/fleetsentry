import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "inspection_item_results" })
export class InspectionItemResultsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inspection_schedule_result_id", type: "int" })
  inspection_schedule_result_id: number;

  @Column({ name: "inspection_item_id", type: "int" })
  inspection_item_id: number;

  @Column({ name: "inspection_data", type: "varchar", length: 255, nullable: false })
  inspection_data: string;

  @Column({ name: "inspection_data_en", type: "varchar", length: 255, nullable: true, default: null })
  inspection_data_en: string;

  @Column({ name: "pass_fail_result", type: "smallint", nullable: false, default: 0 })
  pass_fail_result: number;

  @Column({ name: "coordinate", type: "varchar", length: 100, nullable: true, default: null }) // Only coordinate
  coordinate: string;

  @Column({ name: "value1", type: "varchar", length: 100, nullable: true, default: null }) // Only coordinate
  value1: string;

  @Column({ name: "value2", type: "varchar", length: 100, nullable: true, default: null }) // Only coordinate
  value2: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
