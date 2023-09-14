import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { MstProgramEntity, RoleProgramEntity } from "../entities";

@Entity({ name: "roles" })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "name", type: "varchar", length: "20", nullable: false })
  name: string;

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
  @OneToMany((type) => RoleProgramEntity, (roleProgram) => roleProgram.role)
  rolePrograms: RoleProgramEntity[];
}
