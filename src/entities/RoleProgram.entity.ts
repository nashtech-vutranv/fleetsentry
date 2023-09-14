import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { RoleEntity, MstProgramEntity } from "../entities";

@Entity({ name: "role_programs" })
export class RoleProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "program_id", type: "int", nullable: false })
  program_id: number;

  @Column({ name: "role_id", type: "int", nullable: false })
  role_id: number;

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
  @ManyToOne(() => RoleEntity, (role) => role.rolePrograms)
  @JoinColumn({ name: "role_id", referencedColumnName: "id" })
  role: RoleEntity;

  @ManyToOne(() => MstProgramEntity, (mstProgram) => mstProgram.rolePrograms)
  @JoinColumn({ name: "program_id", referencedColumnName: "id" })
  mstProgram: MstProgramEntity;
}
