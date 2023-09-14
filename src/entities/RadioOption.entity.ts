import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "radio_items" })
export class RadioOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inspection_item_id", type: "int" })
  inspection_item_id: number;

  @Column({ name: "label", type: "varchar", length: 100, nullable: false })
  label: string;

  @Column({ name: "label_en", type: "varchar", length: 100, nullable: true, default: null })
  label_en: string;

  @Column({ name: "value", type: "varchar", length: 100, nullable: false })
  value: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
