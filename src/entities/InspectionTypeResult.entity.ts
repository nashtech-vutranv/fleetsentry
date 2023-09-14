import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "inspection_type_results" })
export class InspectionTypeResultEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "inspection_result_code", type: "varchar", length: 20, nullable: false })
  inspection_result_code: string;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  certificate_id: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  mail_template_id: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
