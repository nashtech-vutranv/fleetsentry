import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "batch_vehicle_log" })
export class BatchVehicleLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "inspection_schedule_result_id", type: "int", nullable: false })
  inspection_schedule_result_id: number;

  @Column({ name: "payload", type: "jsonb", nullable: true, default: null })
  payload: object;

  @Column({ name: "is_condition_1", type: "smallint", nullable: false, default: 0 })
  is_condition_2is_condition_1: number;

  @Column({ name: "is_condition_1", type: "smallint", nullable: false, default: 0 })
  is_condition_2: number;

  @Column({ name: "new_inspection_schedule_result_id", type: "int", nullable: true, default: null })
  new_inspection_schedule_result_id: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
