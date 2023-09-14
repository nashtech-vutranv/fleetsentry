import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// TODO change table name lvis_master
@Entity({ name: "todo" })
export class LvisMasterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO add more property

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
