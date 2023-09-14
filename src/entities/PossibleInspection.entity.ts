import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SiteEntity } from "../entities";
// TODO Need rename EntityName
@Entity({ name: "site_inspection_type" })
export class PossibleInspectionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "site_id", type: "int" })
  site_id: number;

  @Column({ name: "inspection_type_id", type: "int" })
  inspection_type_id: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  /**
   * ---------------------------------------------------------
   */
  @ManyToOne(() => SiteEntity, (site) => site.possible_inspections)
  @JoinColumn({ name: "site_id", referencedColumnName: "id" })
  site: SiteEntity;
}
