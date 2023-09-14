import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IAuth } from "src/core/interface";
import { VehicleCommentEntity } from "src/entities";
import { Repository } from "typeorm";
import { CreateVehicleCommentDto } from "./vehicle-comment.dto";

@Injectable()
export class VehicleCommentService {
  constructor(@InjectRepository(VehicleCommentEntity) private vehicleCommentRepo: Repository<VehicleCommentEntity>) {}

  public async getVehicleCommentByIdentificationNumber(identificationNumber: string): Promise<VehicleCommentEntity[]> {
    return await this.vehicleCommentRepo.find({
      where: { identification_number: identificationNumber },
      order: { created_at: "DESC" },
    });
  }

  public async create(auth: IAuth, vehicleCommentObj: CreateVehicleCommentDto): Promise<VehicleCommentEntity> {
    const newVehicleComment = {
      ...vehicleCommentObj,
      company_code: auth.company_code,
      created_by: auth.id,
      updated_by: auth.id,
    };
    return await this.vehicleCommentRepo.save(this.vehicleCommentRepo.create(newVehicleComment));
  }
}
