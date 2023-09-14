import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./User.entity";
import { MstProgramEntity } from "./MstProgram.entity";

@Entity({ name: "mail_templates" })
export class MailTemplateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "program_id", type: "int" })
  program_id: number;

  @Column({ name: "subject", type: "varchar", length: 255, nullable: false })
  subject: string;

  @Column({ name: "content", type: "text", nullable: true, default: null })
  content: string;

  @Column({ name: "default_flag", type: "smallint", nullable: false, default: 0 })
  default_flag: number;

  @Column({ name: "accountee_send_flag", type: "smallint", nullable: false, default: 0 })
  accountee_send_flag: number;

  @Column({ name: "consignee_send_flag", type: "smallint", nullable: false, default: 0 })
  consignee_send_flag: number;

  @Column({ name: "applicant_send_flag", type: "smallint", nullable: false, default: 0 })
  applicant_send_flag: number;

  @Column({ name: "receiving_sending_flag", type: "smallint", nullable: false, default: 0 })
  receiving_sending_flag: number;

  @Column({ name: "email_address_1", type: "varchar", length: 255, nullable: true, default: null })
  email_address_1: string;

  @Column({ name: "email_address_2", type: "varchar", length: 255, nullable: true, default: null })
  email_address_2: string;

  @Column({ name: "email_address_3", type: "varchar", length: 255, nullable: true, default: null })
  email_address_3: string;

  @Column({ name: "email_address_4", type: "varchar", length: 255, nullable: true, default: null })
  email_address_4: string;

  @Column({ name: "email_address_5", type: "varchar", length: 255, nullable: true, default: null })
  email_address_5: string;

  @Column({ name: "email_address_6", type: "varchar", length: 255, nullable: true, default: null })
  email_address_6: string;

  @Column({ name: "cc_email_address_1", type: "varchar", length: 255, nullable: true, default: null })
  cc_email_address_1: string;

  @Column({ name: "cc_email_address_2", type: "varchar", length: 255, nullable: true, default: null })
  cc_email_address_2: string;

  @Column({ name: "cc_email_address_3", type: "varchar", length: 255, nullable: true, default: null })
  cc_email_address_3: string;

  @Column({ name: "cc_email_address_4", type: "varchar", length: 255, nullable: true, default: null })
  cc_email_address_4: string;

  @Column({ name: "cc_email_address_5", type: "varchar", length: 255, nullable: true, default: null })
  cc_email_address_5: string;

  @Column({ name: "cc_email_address_6", type: "varchar", length: 255, nullable: true, default: null })
  cc_email_address_6: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true })
  updated_at: string;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deleted_at: string;

  @ManyToOne(() => UserEntity, (user) => user.mailTemplates)
  @JoinColumn([{ name: "created_by" }, { name: "updated_by" }])
  user: UserEntity;

  @ManyToOne(() => MstProgramEntity, (mstProgram) => mstProgram.mailTemplates)
  @JoinColumn({ name: "program_id", referencedColumnName: "id" })
  mstProgram: MstProgramEntity;
}
