import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "inspection_type_item" })
export class InspectionTypeItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "inspection_item_id", type: "int", nullable: false })
  inspection_item_id: number;

  @Column({ name: "required_flag", type: "smallint", nullable: true, default: null })
  required_flag: number;

  @Column({ name: "pass_target_flag", type: "smallint", nullable: true, default: null })
  pass_target_flag: number;

  @Column({ name: "threshold", type: "float", nullable: true, default: null })
  threshold: number;

  @Column({ name: "passing_value", type: "varchar", length: 100, nullable: true, default: null })
  passing_value: string;

  @Column({ name: "used_flag", type: "smallint", nullable: true, default: null })
  used_flag: number;

  @Column({ name: "en_result_required_flag", type: "smallint", nullable: true, default: null })
  en_result_required_flag: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}