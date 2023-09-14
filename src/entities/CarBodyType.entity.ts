import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mst_car_body_type" })
export class CarBodyTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO add more property
  @Column({ name: "company_code", type: "varchar", nullable: true, default: null })
  company_code: string;

  @Column({ name: "type_of_model", type: "varchar", nullable: true, default: null })
  type_of_model: string;

  @Column({ name: "maker", type: "varchar", nullable: true, default: null })
  maker: string;

  @Column({ name: "type_classification_start", type: "int", nullable: true, default: null })
  type_classification_start: number;

  @Column({ name: "type_classification_end", type: "int", nullable: true, default: null })
  type_classification_end: number;

  @Column({ name: "car_model_lower_limit", type: "int", nullable: true, default: null })
  car_model_lower_limit: number;

  @Column({ name: "car_model_upper_limit", type: "int", nullable: true, default: null })
  car_model_upper_limit: number;

  @Column({ name: "fuel", type: "float", nullable: true, default: null })
  fuel: number;

  @Column({ name: "co2", type: "int", nullable: true, default: null })
  co2: number;

  @Column({ name: "measurement_mode", type: "varchar", nullable: true, default: null })
  measurement_mode: string;

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
