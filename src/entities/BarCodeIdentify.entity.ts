import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "barcode_identify" })
export class BarCodeIdentifyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "barcode", type: "varchar", length: 100 })
  barcode: string;

  @Column({ name: "identification_number", type: "varchar", length: 100, nullable: false })
  identification_number: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
