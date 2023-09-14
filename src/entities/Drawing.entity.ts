import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "drawings" })
export class DrawingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "name", type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ name: "name_en", type: "varchar", length: 100, nullable: true, default: null })
  name_en: string;

  @Column({ name: "image_path", type: "varchar", length: 255, nullable: true })
  image_path: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
