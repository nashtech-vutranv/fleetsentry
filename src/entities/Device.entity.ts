import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "devices" })
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id", type: "int", nullable: true, default: null })
  user_id: number;

  @Column({ name: "uuid", type: "varchar", length: "100", nullable: false })
  uuid: string;

  @Column({ name: "os", type: "smallint", nullable: false, default: 1 })
  os: number;

  @Column({ name: "os_version", type: "varchar", length: "20", nullable: true, default: null })
  os_version: string;

  @Column({ name: "app_version", type: "varchar", length: "20", nullable: true, default: null })
  app_version: string;

  @Column({ name: "fcm_token", type: "varchar", length: "200", nullable: true, default: null })
  fcm_token: string;

  @Column({ name: "payload", type: "json", nullable: true })
  payload: Record<string, any>;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
