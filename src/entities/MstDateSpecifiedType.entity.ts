import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mst_date_specified_types" })
export class MstDateSpecifiedTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "site_id", type: "int", nullable: false })
  site_id: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "monday_available_count", type: "smallint", nullable: null })
  monday_available_count: number;

  @Column({ name: "tuesday_available_count", type: "smallint", nullable: null })
  tuesday_available_count: number;

  @Column({ name: "wednesday_available_count", type: "smallint", nullable: null })
  wednesday_available_count: number;

  @Column({ name: "thursday_available_count", type: "smallint", nullable: null })
  thursday_available_count: number;

  @Column({ name: "friday_available_count", type: "smallint", nullable: null })
  friday_available_count: number;

  @Column({ name: "saturday_available_count", type: "smallint", nullable: null })
  saturday_available_count: number;

  @Column({ name: "sunday_available_count", type: "smallint", nullable: null })
  sunday_available_count: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
