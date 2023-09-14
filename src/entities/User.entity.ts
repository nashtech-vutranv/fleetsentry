import { Column, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MailTemplateEntity } from "./MailTemplate.entity";
import { InspectorEntity } from "./Inspector.entity";
import { NotificationEntity } from "./Notification.entity";
import { NotificationUserEntity } from "./NotificationUser.entity";

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "inspector_flag", type: "smallint", nullable: false, default: 1 })
  inspector_flag: number;

  @Column({ name: "lock_flag", type: "smallint", nullable: false, default: 0 })
  lock_flag: number;

  @Column({ name: "user_type_code", type: "timestamp", nullable: false })
  user_type_code: string;

  @Column({ name: "lastname", type: "varchar", nullable: true })
  lastname: string;

  @Column({ name: "firstname", type: "varchar", nullable: true })
  firstname: string;

  @Column({ name: "lastname_kana", type: "varchar", nullable: true })
  lastname_kana: string;

  @Column({ name: "firstname_kana", type: "varchar", nullable: true })
  firstname_kana: string;

  @Column({ name: "lastname_en", type: "varchar", nullable: true })
  lastname_en: string;

  @Column({ name: "firstname_en", type: "varchar", nullable: true })
  firstname_en: string;

  @Column({ name: "email", type: "varchar", nullable: false })
  email: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  @Column({ name: "phone_number", type: "varchar", length: 20, nullable: true, default: null })
  phone_number: string;

  @Column({ name: "last_login_at", type: "timestamp", nullable: true })
  last_login_at: string;

  @Column({ name: "last_pw_changed_at", type: "timestamp", nullable: true })
  last_pw_changed_at: string;

  @Column({ name: "pwd_expiration_date", type: "timestamp", nullable: true })
  pwd_expiration_date: string;

  @Column({ name: "date_format", type: "varchar", nullable: true })
  date_format: string;

  @Column({ name: "language", type: "varchar", nullable: true })
  language: string;

  @Column({ name: "start_program", type: "varchar", nullable: true })
  start_program: string;

  @Column({ name: "timezone_code", type: "varchar", nullable: true })
  timezone_code: string;

  @Column({ name: "default_keyboard", type: "varchar", length: 100, nullable: true, default: null })
  default_keyboard: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deleted_at: string;

  @OneToMany(() => MailTemplateEntity, (mailTemplate) => mailTemplate.user)
  @JoinColumn({ name: "mailTemplates" })
  mailTemplates: MailTemplateEntity[];

  @OneToOne(() => InspectorEntity, (inspector) => inspector.user)
  inspector: InspectorEntity;

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  @JoinColumn({ name: "notifications" })
  notifications: NotificationEntity[];

  @OneToMany(() => NotificationUserEntity, (notification) => notification.user)
  @JoinColumn({ name: "notificationUsers" })
  notificationUsers: NotificationUserEntity[];

  /**
   * =============================================================================
   */
  public get getLockedFlag(): boolean {
    return this.lock_flag === 1;
  }
}
