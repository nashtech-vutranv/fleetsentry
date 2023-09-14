import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { TabEntity } from "./Tab.entity";
import { MstInspectionItemEntity } from "./MstInspectionItem.entity";
import { InspectionItemResultsEntity } from "./InspectionItemResults.entity";

@Entity({ name: "tab_items" })
export class TabItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "tab_id", type: "int", nullable: false })
  tab_id: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "inspection_item_id", type: "int", nullable: false })
  inspection_item_id: number;

  @Column({ name: "order", type: "smallint", nullable: false, default: 1 })
  order: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  /**
   * ===============================================  [Relationship]  ===============================================
   */
  @ManyToOne(() => TabEntity, (tab: TabEntity) => tab.tabItems)
  @JoinColumn({ name: "tab_id", referencedColumnName: "id" })
  tab: TabEntity;

  @OneToOne(() => InspectionItemResultsEntity)
  // @OneToOne(() => InspectionItemResultsEntity, (entity: InspectionItemResultsEntity) => entity.inspection_item_id)
  @JoinColumn({ name: "inspection_item_id", referencedColumnName: "inspection_item_id" })
  itemData: InspectionItemResultsEntity;

  @OneToOne(() => MstInspectionItemEntity)
  @JoinColumn({ name: "inspection_item_id", referencedColumnName: "id" })
  itemConf: MstInspectionItemEntity;
}
