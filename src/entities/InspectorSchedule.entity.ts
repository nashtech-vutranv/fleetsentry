import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { InspectorEntity } from "./Inspector.entity";

@Entity({ name: "inspector_schedule" })
export class InspectorScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inspector_id", type: "int", nullable: false })
  inspector_id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "date", type: "date", nullable: true })
  date: string;

  @Column({ name: "operating_time_from", type: "time", nullable: true, default: null })
  operating_time_from: string;

  @Column({ name: "operating_time_to", type: "time", nullable: true, default: null })
  operating_time_to: string;

  @Column({ name: "dayoff_flag", type: "smallint", nullable: true, default: null })
  dayoff_flag: number;

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

  @ManyToOne(() => InspectorEntity, (inspector) => inspector.id)
  @JoinColumn({ name: "inspector_id", referencedColumnName: "id" })
  inspector: InspectorEntity;
}
