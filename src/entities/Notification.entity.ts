import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { NotificationUserEntity } from "./NotificationUser.entity";
import { UserEntity } from "./User.entity";

@Entity({ name: "notifications" })
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "title", type: "varchar", nullable: true, default: null })
  title: string;

  @Column({ name: "body", type: "text", nullable: true, default: null })
  body: string;

  @Column({ name: "release_from", type: "timestamp", nullable: true })
  release_from: string;

  @Column({ name: "release_to", type: "timestamp", nullable: true })
  release_to: string;

  @Column({ name: "important_flag", type: "smallint", nullable: true, default: 0 })
  important_flag: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  @OneToMany(() => NotificationUserEntity, (notificationUser) => notificationUser.notification)
  @JoinColumn({ name: "notificationUsers" })
  notificationUsers: NotificationUserEntity[];

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  @JoinColumn([{ name: "created_by" }, { name: "updated_by" }])
  user: UserEntity;
}
