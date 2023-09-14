import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mst_area_schedule_standard" })
export class AreaScheduleStandardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "area_code", type: "varchar", length: "20", nullable: false })
  area_code: string;

  @Column({ name: "monday_standard_time_from", type: "time", nullable: true, default: null })
  monday_standard_time_from: string;

  @Column({ name: "monday_standard_time_to", type: "time", nullable: true, default: null })
  monday_standard_time_to: string;

  @Column({ name: "tuesday_standard_time_from", type: "time", nullable: true, default: null })
  tuesday_standard_time_from: string;

  @Column({ name: "tuesday_standard_time_to", type: "time", nullable: true, default: null })
  tuesday_standard_time_to: string;

  @Column({ name: "wednesday_standard_time_from", type: "time", nullable: true, default: null })
  wednesday_standard_time_from: string;

  @Column({ name: "wednesday_standard_time_to", type: "time", nullable: true, default: null })
  wednesday_standard_time_to: string;

  @Column({ name: "thursday_standard_time_from", type: "time", nullable: true, default: null })
  thursday_standard_time_from: string;

  @Column({ name: "thursday_standard_time_to", type: "time", nullable: true, default: null })
  thursday_standard_time_to: string;

  @Column({ name: "friday_standard_time_from", type: "time", nullable: true, default: null })
  friday_standard_time_from: string;

  @Column({ name: "friday_standard_time_to", type: "time", nullable: true, default: null })
  friday_standard_time_to: string;

  @Column({ name: "saturday_standard_time_from", type: "time", nullable: true, default: null })
  saturday_standard_time_from: string;

  @Column({ name: "saturday_standard_time_to", type: "time", nullable: true, default: null })
  saturday_standard_time_to: string;

  @Column({ name: "sunday_standard_time_from", type: "time", nullable: true, default: null })
  sunday_standard_time_from: string;

  @Column({ name: "sunday_standard_time_to", type: "time", nullable: true, default: null })
  sunday_standard_time_to: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
