import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mst_time_specified_types" })
export class TimeSpecifiedTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "site_id", type: "int", nullable: false })
  site_id: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "monday_available_time_from", type: "time", nullable: null })
  monday_available_time_from: string;

  @Column({ name: "monday_available_time_to", type: "time", nullable: null })
  monday_available_time_to: string;

  @Column({ name: "monday_exception_time_from", type: "time", nullable: null })
  monday_exception_time_from: string;

  @Column({ name: "monday_exception_time_to", type: "time", nullable: null })
  monday_exception_time_to: string;

  @Column({ name: "tuesday_available_time_from", type: "time", nullable: null })
  tuesday_available_time_from: string;

  @Column({ name: "tuesday_available_time_to", type: "time", nullable: null })
  tuesday_available_time_to: string;

  @Column({ name: "tuesday_exception_time_from", type: "time", nullable: null })
  tuesday_exception_time_from: string;

  @Column({ name: "tuesday_exception_time_to", type: "time", nullable: null })
  tuesday_exception_time_to: string;

  @Column({ name: "wednesday_available_time_from", type: "time", nullable: null })
  wednesday_available_time_from: string;

  @Column({ name: "wednesday_available_time_to", type: "time", nullable: null })
  wednesday_available_time_to: string;

  @Column({ name: "wednesday_exception_time_from", type: "time", nullable: null })
  wednesday_exception_time_from: string;

  @Column({ name: "wednesday_exception_time_to", type: "time", nullable: null })
  wednesday_exception_time_to: string;

  @Column({ name: "thursday_available_time_from", type: "time", nullable: null })
  thursday_available_time_from: string;

  @Column({ name: "thursday_available_time_to", type: "time", nullable: null })
  thursday_available_time_to: string;

  @Column({ name: "thursday_exception_time_from", type: "time", nullable: null })
  thursday_exception_time_from: string;

  @Column({ name: "thursday_exception_time_to", type: "time", nullable: null })
  thursday_exception_time_to: string;

  @Column({ name: "friday_available_time_from", type: "time", nullable: null })
  friday_available_time_from: string;

  @Column({ name: "friday_available_time_to", type: "time", nullable: null })
  friday_available_time_to: string;

  @Column({ name: "friday_exception_time_from", type: "time", nullable: null })
  friday_exception_time_from: string;

  @Column({ name: "friday_exception_time_to", type: "time", nullable: null })
  friday_exception_time_to: string;

  @Column({ name: "saturday_available_time_from", type: "time", nullable: null })
  saturday_available_time_from: string;

  @Column({ name: "saturday_available_time_to", type: "time", nullable: null })
  saturday_available_time_to: string;

  @Column({ name: "saturday_exception_time_from", type: "time", nullable: null })
  saturday_exception_time_from: string;

  @Column({ name: "saturday_exception_time_to", type: "time", nullable: null })
  saturday_exception_time_to: string;

  @Column({ name: "sunday_available_time_from", type: "time", nullable: null })
  sunday_available_time_from: string;

  @Column({ name: "sunday_available_time_to", type: "time", nullable: null })
  sunday_available_time_to: string;

  @Column({ name: "sunday_exception_time_from", type: "time", nullable: null })
  sunday_exception_time_from: string;

  @Column({ name: "sunday_exception_time_to", type: "time", nullable: null })
  sunday_exception_time_to: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
