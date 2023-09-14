import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, JoinColumn, OneToOne } from "typeorm";
import { MultiInspectionTypeEntity } from "./MultiInspectionType.entity";

@Entity({ name: "inspection_types" })
export class InspectionTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "mode", type: "smallint", nullable: false, default: 0 })
  mode: number;

  @Column({ name: "inspection_code", type: "varchar", length: 20, nullable: false })
  inspection_code: string;

  @Column({ name: "category_code", type: "varchar", length: 20, nullable: true })
  category_code: string;

  @Column({ name: "group_code", type: "varchar", length: 20, nullable: true })
  group_code: string;

  @Column({ name: "inspection_description", type: "varchar", length: 255, nullable: true, default: null })
  inspection_description: string;

  @Column({ name: "inspection_assign_method", type: "smallint", nullable: true, default: 1 })
  inspection_assign_method: number;

  @Column({ name: "visit_able_flag", type: "smallint", nullable: false, default: 0 })
  visit_able_flag: number;

  @Column({ name: "certificate_issue_flag", type: "smallint", nullable: false, default: 0 })
  certificate_issue_flag: number;

  @Column({ name: "re_inspection_able_flag", type: "smallint", nullable: false, default: 0 })
  re_inspection_able_flag: number;

  @Column({ name: "re_inspection_assign_method", type: "smallint", nullable: false, default: 0 })
  re_inspection_assign_method: number;

  @Column({ name: "self_assignable_flag", type: "smallint", nullable: false, default: 0 })
  self_assignable_flag: number;

  @Column({ name: "estimated_time", type: "time", nullable: false, default: 0 })
  estimated_time: string;

  @Column({ name: "manifest_type", type: "varchar", length: 20, nullable: true, default: null })
  manifest_type: string;

  @Column({ name: "en_input_flag", type: "smallint", nullable: false, default: 0 })
  en_input_flag: number;

  @Column({ name: "certificate_delivery_flag", type: "smallint", nullable: false, default: 0 })
  certificate_delivery_flag: number;

  @Column({ name: "ns_result_send_flag", type: "smallint", nullable: false, default: 0 })
  ns_result_send_flag: number;

  @Column({ name: "external_inspector_flag", type: "smallint", nullable: false, default: 0 })
  external_inspector_flag: number;

  @Column({ name: "interval_flag_1", type: "smallint", nullable: false, default: 0 })
  interval_flag_1: number;

  @Column({ name: "interval_flag_2", type: "smallint", nullable: false, default: 0 })
  interval_flag_2: number;

  @Column({ name: "qc_flag", type: "smallint", nullable: false, default: 0 })
  qc_flag: number;

  @Column({ name: "number_of_interval", type: "smallint", nullable: null, default: null })
  number_of_interval: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true, default: null })
  deleted_at: string;

  //Relationship
  @OneToOne(() => MultiInspectionTypeEntity, (multiInspectionType) => multiInspectionType.inspectionType)
  @JoinColumn({ name: "id", referencedColumnName: "inspection_type_id" })
  multiInspectionType: MultiInspectionTypeEntity[];
}
