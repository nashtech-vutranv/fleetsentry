import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mst_language_label" })
export class LanguageLabelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "key", type: "varchar", length: 20, nullable: false })
  key: string;

  @Column({ name: "label", type: "varchar", length: 20, nullable: false })
  label: string;

  @Column({ name: "japanese", type: "varchar", nullable: true, default: null })
  japanese: string;

  @Column({ name: "english", type: "varchar", nullable: true, default: null })
  english: string;

  @Column({ name: "chinese", type: "varchar", nullable: true, default: null })
  chinese: string;

  @Column({ name: "spanish", type: "varchar", nullable: true, default: null })
  spanish: string;

  @Column({ name: "vietnamese", type: "varchar", nullable: true, default: null })
  vietnamese: string;

  @Column({ name: "mobile_flag", type: "smallint", nullable: true, default: 0 })
  mobile_flag: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
