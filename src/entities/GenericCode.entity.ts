import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";

@Entity({ name: "mst_generic_code" })
export class GenericCodeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "key_type", type: "varchar", length: 20, nullable: false })
  key_type: string;

  @Column({ name: "key_value", type: "varchar", length: 20, nullable: false })
  key_value: string;

  @Column({ name: "attribute1", type: "varchar", length: 255, nullable: true })
  attribute1: string;

  @Column({ name: "attribute2", type: "varchar", length: 255, nullable: true })
  attribute2: string;

  @Column({ name: "attribute3", type: "varchar", length: 255, nullable: true })
  attribute3: string;

  @Column({ name: "language", type: "varchar", length: 20 })
  language: string;

  @Column({ name: "order", type: "smallint", nullable: true })
  order: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
