import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoleProgramEntity } from "./RoleProgram.entity";
import { MailTemplateEntity } from "./MailTemplate.entity";

@Entity({ name: "mst_programs" })
export class MstProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "program_name", type: "varchar", nullable: false })
  program_name: string;

  @Column({ name: "program_name_en", type: "varchar", nullable: true, default: null })
  program_name_en: string;

  @Column({ name: "program_number", type: "varchar", nullable: false })
  program_number: string;

  @Column({ name: "read_permission_flag", type: "boolean", nullable: false, default: false })
  read_permission_flag: boolean;

  @Column({ name: "create_permission_flag", type: "boolean", nullable: false, default: false })
  create_permission_flag: boolean;

  @Column({ name: "update_permission_flag", type: "boolean", nullable: false, default: false })
  update_permission_flag: boolean;

  @Column({ name: "delete_permission_flag", type: "boolean", nullable: false, default: false })
  delete_permission_flag: boolean;

  @Column({ name: "download_permission_flag", type: "boolean", nullable: false, default: false })
  download_permission_flag: boolean;

  @Column({ name: "system_flag", type: "boolean", nullable: false, default: false })
  system_flag: boolean;

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
  @OneToMany((type) => RoleProgramEntity, (roleProgram) => roleProgram.mstProgram)
  rolePrograms: RoleProgramEntity[];

  @OneToMany((type) => MailTemplateEntity, (mailTemplate) => mailTemplate.mstProgram)
  mailTemplates: RoleProgramEntity[];
}
