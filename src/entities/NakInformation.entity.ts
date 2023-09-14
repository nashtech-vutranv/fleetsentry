import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "nak_information" })
export class NakInformationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: "20", nullable: false })
  company_code: string;

  @Column({ name: "send_at", type: "timestamp", nullable: true, default: null })
  send_at: string;

  @Column({ name: "send_distance", type: "int", nullable: false })
  send_distance: number;

  @Column({ name: "inspection_type_id", type: "int", nullable: false })
  inspection_type_id: number;

  @Column({ name: "original_distance", type: "int", nullable: false })
  original_distance: number;

  @Column({ name: "original_measurement_at", type: "timestamp", nullable: true, default: null })
  original_measurement_at: string;

  @Column({ name: "auction_site", type: "varchar", nullable: true, default: null })
  auction_site: string;

  @Column({ name: "sender_id", type: "int", nullable: false })
  sender_id: number;

  @Column({ name: "identification_number", type: "varchar", length: 100, nullable: true, default: null })
  identification_number: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
