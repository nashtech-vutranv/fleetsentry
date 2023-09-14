import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NotificationEntity } from "./Notification.entity";
import { UserEntity } from "./User.entity";

@Entity({ name: "notification_user" })
export class NotificationUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "notification_id", type: "int", nullable: false, default: null })
  notification_id: number;

  @Column({ name: "recipient_id", type: "int", nullable: false, default: null })
  recipient_id: number;

  @Column({ name: "sender_id", type: "int", nullable: true, default: null })
  sender_id: number;

  @Column({ name: "received_at", type: "timestamp", nullable: true, default: null })
  received_at: number;

  @Column({ name: "read_flag", type: "smallint", nullable: true, default: 0 })
  read_flag: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  @ManyToOne(() => NotificationEntity, (notification) => notification.notificationUsers)
  @JoinColumn({ name: "notification_id" })
  notification: NotificationEntity;

  @ManyToOne(() => UserEntity, (user) => user.notificationUsers)
  @JoinColumn([{ name: "recipient_id" }])
  user: UserEntity;
}
