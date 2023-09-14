import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "inspector_area" })
export class InspectorAreaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inspector_id", type: "int", nullable: false })
  inspector_id: number;

  @Column({ name: "area_code", type: "varchar", length: 20, nullable: false })
  area_code: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  @Column({ name: "deleted_at", type: "timestamp", nullable: true, default: null })
  deleted_at: string;
}
