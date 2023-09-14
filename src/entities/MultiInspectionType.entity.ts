import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { InspectionTypeEntity } from "./InspectionType.entity";

@Entity({ name: "multi_inspection_types" })
export class MultiInspectionTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "key_types", type: "varchar", length: 20, nullable: false })
  key_types: string;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "inspection_type_id_1", type: "int", nullable: false })
  inspection_type_id_1: number;

  @Column({ name: "inspection_type_id_2", type: "int", nullable: false })
  inspection_type_id_2: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  //Relationship
  @OneToOne(() => InspectionTypeEntity, (inspectionType) => inspectionType.multiInspectionType)
  @JoinColumn({ name: "inspection_type_id", referencedColumnName: "id" })
  inspectionType: InspectionTypeEntity;
}
