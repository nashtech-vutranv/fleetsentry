import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "mst_input_item" })
export class InputItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "company_code", type: "varchar", length: 20, nullable: false })
  company_code: string;

  @Column({ name: "input_field_name", type: "varchar", length: 20, nullable: false })
  input_field_name: string;

  @Column({ name: "data_type", type: "varchar", length: 20, nullable: false })
  data_type: string;

  @Column({ name: "minimum_digit_length", type: "int", default: 0, nullable: false })
  minimum_digit_length: number;

  @Column({ name: "maximum_digit_length", type: "int", nullable: false })
  maximum_digit_length: number;

  @Column({ name: "past_date_possible", type: "timestamp", nullable: true, default: null })
  past_date_possible: string;

  @Column({ name: "future_date_possible", type: "timestamp", nullable: true, default: null })
  future_date_possible: string;

  @Column({ name: "list_key_code", array: true, type: "jsonb", nullable: true, default: [] })
  list_key_code: string[];

  @Column({ name: "created_by", type: "int", nullable: true, default: null })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true, default: null })
  updated_by: number;

  @Column({ name: "created_at", type: "timestamp", nullable: true, default: null })
  created_at: string;

  @Column({ name: "updated_at", type: "timestamp", nullable: true, default: null })
  updated_at: string;
}
