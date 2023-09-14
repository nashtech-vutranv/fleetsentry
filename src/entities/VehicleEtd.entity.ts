import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mock_vehicle_etd" })
export class VehicleEtdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "identification_number", type: "varchar", length: 100, nullable: false })
  identification_number: string;

  @Column({ name: "date", type: "date", nullable: false })
  date: string;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
