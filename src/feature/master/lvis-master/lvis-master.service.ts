import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Paginate } from "src/utils";
import { FilterDto } from "./lvis-master.dto";
import { IPaginateReq } from "src/core/decorators";
import { LvisMasterEntity } from "src/entities/LvisMaster.entity";

@Injectable()
export class LvisMasterService {
  constructor(@InjectRepository(LvisMasterEntity) private lvisRepo: Repository<LvisMasterEntity>) {}

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName index
   * @description
   */
  public async filter(filterRequest: FilterDto, pagination: IPaginateReq): Promise<any> {
    // TODO [ToanNV] - Them logic filter khi co du thong tin
    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const [items, total] = await this.lvisRepo.findAndCount({
      order: { id: "DESC" },
      take: take,
      skip: skip,
    });

    return new Paginate(items, total, page, size);
  }
}
