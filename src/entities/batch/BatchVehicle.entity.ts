import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "batch_vehicle" })
export class BatchVehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "type", type: "smallint", nullable: false })
  type: number;

  @Column({ name: "qty1", type: "int", nullable: false, default: 0 })
  qty1: number;

  @Column({ name: "qty2", type: "int", nullable: false, default: 0 })
  qty2: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
