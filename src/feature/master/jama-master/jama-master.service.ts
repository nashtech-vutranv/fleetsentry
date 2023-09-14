import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Paginate } from "src/utils";
import { FilterDto } from "./jama-master.dto";
import { IPaginateReq } from "src/core/decorators";
import { JamaMasterEntity } from "src/entities/JamaMaster.entity";

@Injectable()
export class JamaMasterService {
  constructor(@InjectRepository(JamaMasterEntity) private jamaRepo: Repository<JamaMasterEntity>) {}

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

    const [items, total] = await this.jamaRepo.findAndCount({
      order: { id: "DESC" },
      take: take,
      skip: skip,
    });

    return new Paginate(items, total, page, size);
  }
}
