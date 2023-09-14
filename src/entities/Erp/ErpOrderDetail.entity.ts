import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "order_detail" })
export class ErpOrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "order_header_id", type: "int", nullable: false })
  order_header_id: number;

  // TODO

  @Column({ name: "created_at", type: "timestamp", nullable: true })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true })
  updated_at: string;
}
