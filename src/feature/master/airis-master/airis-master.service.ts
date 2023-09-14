import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Paginate } from "src/utils";
import { FilterDto } from "./airis-master.dto";
import { IPaginateReq } from "src/core/decorators";
import { AirisMasterEntity } from "src/entities/AirisMaster.entity";

@Injectable()
export class AirisMasterService {
  constructor(@InjectRepository(AirisMasterEntity) private airisRepo: Repository<AirisMasterEntity>) {}

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName filter
   * @description
   */
  public async filter(filterRequest: FilterDto, pagination: IPaginateReq): Promise<any> {
    // TODO [ToanNV] - Them logic filter khi co du thong tin
    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const [items, total] = await this.airisRepo.findAndCount({
      order: { id: "DESC" },
      take: take,
      skip: skip,
    });

    return new Paginate(items, total, page, size);
  }
}
