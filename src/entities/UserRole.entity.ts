import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "user_role" })
export class UserRoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "user_id", type: "int", nullable: false })
  user_id: number;

  @Column({ name: "role_id", type: "int", nullable: false })
  role_id: number;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
