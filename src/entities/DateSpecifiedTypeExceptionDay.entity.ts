import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "date_specified_type_exception_days" })
export class DateSpecifiedTypeExceptionDayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "site_id", type: "int", nullable: false })
  site_id: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "date", type: "date", nullable: null, default: null })
  date: string;

  @Column({ name: "dayoff_flag", type: "smallint", nullable: null, default: null })
  dayoff_flag: number;

  @Column({ name: "possible_count", type: "smallint", nullable: null, default: null })
  possible_count: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
