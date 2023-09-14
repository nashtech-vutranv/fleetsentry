import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany } from "typeorm";
import { PossibleInspectionEntity } from "../entities";

@Entity({ name: "sites" })
export class SiteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "area_code", type: "varchar", length: "20", nullable: false })
  area_code: string;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "name_en", type: "varchar", nullable: true, default: null })
  name_en: string;

  @Column({ name: "address", type: "varchar", nullable: true, default: null })
  address: string;

  @Column({ name: "address_en", type: "varchar", nullable: true, default: null })
  address_en: string;

  @Column({ name: "possible_inspection_id", type: "smallint", nullable: true })
  possible_inspection_id: number;

  @Column({ name: "default_sales_office_code", type: "varchar", length: 20, nullable: true, default: null })
  default_sales_office_code: string;

  @Column({ name: "contact_person", type: "varchar", length: 100, nullable: true, default: null })
  contact_person: string;

  @Column({ name: "email_address", type: "varchar", length: 255, nullable: true, default: null })
  email_address: string;

  @Column({ name: "remarks", type: "varchar", length: 255, nullable: true, default: null })
  remarks: string;

  @Column({ name: "aei_number", type: "varchar", length: 100, nullable: true, default: null })
  aei_number: string;

  @Column({ name: "main_flag", type: "smallint", nullable: true, default: 0 })
  main_flag: number;

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

  @OneToMany(() => PossibleInspectionEntity, (possible_inspection) => possible_inspection.site)
  possible_inspections: PossibleInspectionEntity[];
}
