import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { InspectorScheduleEntity } from "./InspectorSchedule.entity";

@Entity({ name: "inspectors" })
export class InspectorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id", type: "int", nullable: false })
  user_id: number;

  @Column({ name: "inspector_type_code", type: "varchar", length: 20, nullable: true })
  inspector_type_code: string | null;

  @Column({ name: "visit_able_flag", type: "smallint", nullable: true, default: 0 })
  visit_able_flag: number;

  @Column({ name: "internal_inspector_flag", type: "smallint", nullable: true, default: 0 })
  internal_inspector_flag: number;

  @Column({ name: "default_keyboard_array", type: "varchar", nullable: true })
  default_keyboard_array: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  @Column({ name: "deleted_at", type: "timestamp", nullable: true, default: null })
  deleted_at: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;

  @OneToMany(() => InspectorScheduleEntity, (inspectorSchedule) => inspectorSchedule.inspector_id)
  inspectorSchedules: InspectorScheduleEntity[];
}
