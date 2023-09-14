import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NakInformationEntity } from "src/entities";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { IndexNakInformationDto } from "./nak-information.dto";
import { Paginate } from "src/utils";
import { IPaginateReq } from "src/core/decorators";

@Injectable()
export class NakInformationService {
  constructor(@InjectRepository(NakInformationEntity) private nakInformationRepo: Repository<NakInformationEntity>) {}

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName index
   * @description
   */
  public async index(filterRequest: IndexNakInformationDto, pagination: IPaginateReq): Promise<any> {
    const queryBuilder = this.nakInformationRepo.createQueryBuilder("nak_informations").select(["nak_informations.*"]);

    if (filterRequest.id) {
      queryBuilder.andWhere({
        id: filterRequest.id,
      });
    }

    if (filterRequest.company_code) {
      queryBuilder.andWhere({
        company_code: filterRequest.company_code,
      });
    }

    if (filterRequest.from_send_at) {
      queryBuilder.andWhere({
        send_at: MoreThanOrEqual(filterRequest.from_send_at),
      });
    }

    if (filterRequest.send_at) {
      queryBuilder.andWhere({
        send_at: filterRequest.send_at,
      });
    }

    if (filterRequest.to_send_at) {
      queryBuilder.andWhere({
        send_at: LessThanOrEqual(filterRequest.to_send_at),
      });
    }

    if (filterRequest.send_distance) {
      queryBuilder.andWhere({
        send_distance: filterRequest.send_distance,
      });
    }

    if (filterRequest.inspection_type_id) {
      queryBuilder.andWhere({
        inspection_type_id: filterRequest.inspection_type_id,
      });
    }

    if (filterRequest.from_original_measurement_at) {
      queryBuilder.andWhere({
        original_measurement_at: MoreThanOrEqual(filterRequest.from_original_measurement_at),
      });
    }

    if (filterRequest.original_measurement_at) {
      queryBuilder.andWhere({
        original_measurement_at: filterRequest.original_measurement_at,
      });
    }

    if (filterRequest.to_original_measurement_at) {
      queryBuilder.andWhere({
        original_measurement_at: LessThanOrEqual(filterRequest.to_original_measurement_at),
      });
    }

    if (filterRequest.auction_site) {
      queryBuilder.andWhere({
        auction_site: filterRequest.auction_site,
      });
    }

    if (filterRequest.identification_number) {
      queryBuilder.andWhere({
        identification_number: filterRequest.identification_number,
      });
    }

    if (filterRequest.identification_number) {
      queryBuilder.andWhere({
        identification_number: filterRequest.identification_number,
      });
    }

    filterRequest.sortField = filterRequest.sortField || "id";

    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const [list, total] = await Promise.all([
      queryBuilder
        .orderBy(`nak_informations.${filterRequest.sortField}`, filterRequest.sortType)
        .skip(skip)
        .take(take)
        .getRawMany(),

      queryBuilder.getCount(),
    ]);

    return new Paginate(list, total, page, size);
  }
}
