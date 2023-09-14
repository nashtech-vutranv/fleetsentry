import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";

@Entity({ name: "mst_inspection_items" })
export class MstInspectionItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "category", type: "varchar", length: 20, nullable: false }) // GenericCode
  category: string;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "name_en", type: "varchar", nullable: true, default: null })
  name_en: string;

  @Column({ name: "short_name", type: "varchar", length: 255, nullable: true, default: null })
  short_name: string;

  @Column({ name: "short_name_en", type: "varchar", length: 255, nullable: true, default: null })
  short_name_en: string;

  @Column({ name: "input_type", type: "smallint", nullable: true, default: 1 })
  input_type: number;

  @Column({ name: "min_digits", type: "smallint", nullable: true, default: null })
  min_digits: number;

  @Column({ name: "max_digits", type: "smallint", nullable: true, default: null })
  max_digits: number;

  @Column({ name: "decimal_point_digits", type: "smallint", nullable: true, default: null })
  decimal_point_digits: number;

  @Column({ name: "unit", type: "varchar", nullable: true, default: null })
  unit: string;

  @Column({ name: "future_date_flag", type: "smallint", nullable: true, default: null })
  future_date_flag: number;

  @Column({ name: "max_future_days", type: "smallint", nullable: true, default: null })
  max_future_days: number;

  @Column({ name: "past_date_flag", type: "smallint", nullable: true, default: null })
  past_date_flag: number;

  @Column({ name: "max_past_days", type: "smallint", nullable: true, default: null })
  max_past_days: number;

  @Column({ name: "label", type: "varchar", length: 100, nullable: true, default: null })
  label: string;

  @Column({ name: "label_en", type: "varchar", length: 100, nullable: true, default: null })
  label_en: string;

  @Column({ name: "value", type: "varchar", length: 100, nullable: true, default: null })
  value: string;

  @Column({ name: "key_type", type: "varchar", length: 20, nullable: true, default: null })
  key_type: string;

  @Column({ name: "key_type_1", type: "varchar", length: 20, nullable: true, default: null })
  key_type_1: string;

  @Column({ name: "key_type_2", type: "varchar", length: 20, nullable: true, default: null })
  key_type_2: string;

  @Column({ name: "image_size", type: "varchar", length: 20, nullable: true, default: null })
  image_size: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deleted_at: string;

  /**
   * =============================================================================
   */

  public option: any;
}
