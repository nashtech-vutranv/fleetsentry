import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { InspectionTypeItemEntity } from "./InspectionTypeItem.entity";
import { TabItemEntity } from "./TabItem.entity";

@Entity({ name: "tabs" })
export class TabEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "name", type: "varchar", length: 100, nullable: false })
  name: string;

  @Column({ name: "name_en", type: "varchar", length: 100, nullable: true, default: null })
  name_en: string;

  @Column({ name: "order", type: "smallint", nullable: false })
  order: number;

  @Column({ name: "type", type: "varchar", length: 100, nullable: true, default: null })
  type: string;

  @Column({ name: "drawing_id", type: "int", nullable: true, default: null })
  drawing_id: number;

  @Column({ name: "mobile_input_unavailable_flag", type: "int", nullable: true, default: 0 })
  mobile_input_unavailable_flag: number;

  @Column({ name: "upload_flag", type: "int", nullable: true, default: 0 })
  upload_flag: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  items: InspectionTypeItemEntity[];

  /**
   * ===============================================  [Relationship]  ===============================================
   */

  @OneToMany(() => TabItemEntity, (tabItem: TabItemEntity) => tabItem.tab)
  tabItems: TabItemEntity[];
  // @OneToMany(() => TabItemEntity, (tabItem: TabItemEntity) => tabItem.tab)
  // tabItems: TabItemEntity[];
}
