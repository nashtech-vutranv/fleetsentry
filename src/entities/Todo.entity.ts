import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from "typeorm";

@Entity({ name: "todo" })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "int", nullable: false })
  name: string;

  @Column({ name: "sapo", type: "character", nullable: false })
  sapo: string;

  @Column({ name: "status", type: "smallint", nullable: false, default: 0 })
  status: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true })
  updated_at: string;

  @DeleteDateColumn({ name: "deleted_at", type: "timestamp", nullable: true })
  deleted_at: string;
}
