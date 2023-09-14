import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "order_header" })
export class ErpOrderHeaderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO

  @Column({ name: "created_at", type: "timestamp", nullable: true })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true })
  updated_at: string;
}
