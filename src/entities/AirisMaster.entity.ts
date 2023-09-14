import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// TODO change table name jama_master
@Entity({ name: "todo" })
export class AirisMasterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO add more property

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
