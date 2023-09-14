import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "inspector_qualification" })
export class InspectorQualificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inspector_id", type: "int", nullable: false })
  inspector_id: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "approval_permission_flag", type: "smallint", nullable: true })
  approval_permission_flag: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
