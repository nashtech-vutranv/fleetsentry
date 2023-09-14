import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as _ from "lodash";
import { SiteEntity, PossibleInspectionEntity, InspectionTypeEntity, CommonExceptionDaysEntity } from "src/entities";
import { Like, Repository } from "typeorm";
import { Paginate } from "src/utils";
import { CreateSiteDto, IndexSiteDto, UpdateSiteDto } from "./site.dto";
import { ScheduleBobyDto } from "src/feature/schedule/dto";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";
import { IAuth } from "src/core/interface";
import { plainToClass } from "class-transformer";
import { IPaginateReq } from "src/core/decorators";
import { ScheduleService } from "src/feature/schedule/schedule.service";

@Injectable()
export class SiteService {
  constructor(
    @InjectRepository(SiteEntity)
    private siteRepo: Repository<SiteEntity>,
    @InjectRepository(PossibleInspectionEntity)
    private possibleInspectionRepo: Repository<PossibleInspectionEntity>,
    @InjectRepository(InspectionTypeEntity)
    private inspectionTypeRepo: Repository<InspectionTypeEntity>,
    @InjectRepository(CommonExceptionDaysEntity)
    private commonExceptionDaysRepo: Repository<CommonExceptionDaysEntity>,
    private scheduleService: ScheduleService,
  ) {}

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName index
   * @description
   */
  public async index(indexRequest: IndexSiteDto, pagination: IPaginateReq): Promise<any> {
    const queryBuilder = this.siteRepo.createQueryBuilder("sites").select(["sites.*"]);

    if (indexRequest.id) {
      queryBuilder.andWhere({
        id: indexRequest.id,
      });
    }

    if (indexRequest.name) {
      queryBuilder.andWhere({
        name: Like(indexRequest.name),
      });
    }

    if (indexRequest.name_en) {
      queryBuilder.andWhere({
        name_en: Like(indexRequest.name_en),
      });
    }

    if (indexRequest.address) {
      queryBuilder.andWhere({
        address: Like(indexRequest.address),
      });
    }

    if (indexRequest.address_en) {
      queryBuilder.andWhere({
        address_en: Like(indexRequest.address_en),
      });
    }

    if (indexRequest.possible_inspection_id) {
      queryBuilder.andWhere({
        possible_inspection_id: indexRequest.possible_inspection_id,
      });
    }

    if (indexRequest.default_sales_office_code) {
      queryBuilder.andWhere({
        default_sales_office_code: indexRequest.default_sales_office_code,
      });
    }

    if (indexRequest.contact_person) {
      queryBuilder.andWhere({
        contact_person: indexRequest.contact_person,
      });
    }

    if (indexRequest.email_address) {
      queryBuilder.andWhere({
        email_address: indexRequest.email_address,
      });
    }

    if (indexRequest.remarks) {
      queryBuilder.andWhere({
        remarks: indexRequest.remarks,
      });
    }

    if (indexRequest.aei_number) {
      queryBuilder.andWhere({
        aei_number: indexRequest.aei_number,
      });
    }

    if (indexRequest.monday_standard_time) {
      queryBuilder.andWhere({
        monday_standard_time: indexRequest.monday_standard_time,
      });
    }

    if (indexRequest.tuesday_standard_time) {
      queryBuilder.andWhere({
        tuesday_standard_time: indexRequest.tuesday_standard_time,
      });
    }

    if (indexRequest.wednesday_standard_time) {
      queryBuilder.andWhere({
        wednesday_standard_time: indexRequest.wednesday_standard_time,
      });
    }

    if (indexRequest.thursday_standard_time) {
      queryBuilder.andWhere({
        thursday_standard_time: indexRequest.thursday_standard_time,
      });
    }

    if (indexRequest.friday_standard_time) {
      queryBuilder.andWhere({
        friday_standard_time: indexRequest.friday_standard_time,
      });
    }

    if (indexRequest.saturday_standard_time) {
      queryBuilder.andWhere({
        saturday_standard_time: indexRequest.saturday_standard_time,
      });
    }

    if (indexRequest.sunday_standard_time) {
      queryBuilder.andWhere({
        sunday_standard_time: indexRequest.sunday_standard_time,
      });
    }

    if (indexRequest.main_flag) {
      queryBuilder.andWhere({
        main_flag: indexRequest.main_flag,
      });
    }

    indexRequest.sortField = indexRequest.sortField || "id";

    const { page, size } = pagination;
    const take = size;
    const skip = (page - 1) * size;

    const [list, total] = await Promise.all([
      queryBuilder.orderBy(`sites.${indexRequest.sortField}`, indexRequest.sortType).skip(skip).take(take).getRawMany(),

      queryBuilder.getCount(),
    ]);

    return new Paginate(list, total, page, size);
  }

  /**
   * @author nvtoan27101994@gmail.com
   * @functionName show
   * @description
   */
  public async findOne(id: number): Promise<SiteEntity> {
    const item = await this.siteRepo.findOne({
      where: {
        id: id,
      },
    });

    if (!item) throw new AppException(ErrorCode.E130000);

    return item;
  }

  /**
   * @functionName store
   * @author nvtoan27101994@gmail.com
   * @param auth
   * @param param
   * @rule
   */
  public async store(auth: IAuth, createRequest: CreateSiteDto): Promise<SiteEntity> {
    // TODO : Need check site is valid
    // const checkItem = await this.siteRepo.findOne({
    //   where: {
    //     name: createRequest.name,
    //   },
    // });

    // if (!checkItem) throw new AppException(ErrorCode.E130001);

    const item = plainToClass(SiteEntity, createRequest, {
      ignoreDecorators: true,
    });

    item.created_by = auth?.id;
    item.updated_by = auth?.id;

    return await this.siteRepo.save(item);
  }

  /**
   * @functionName update
   * @author nvtoan27101994@gmail.com
   * @param auth
   * @param id
   * @param param
   * @rule
   */
  public async update(auth: IAuth, id: number, updateRequest: UpdateSiteDto): Promise<SiteEntity> {
    const checkItem = await this.findOne(id);

    const item = plainToClass(
      SiteEntity,
      { ...checkItem, ...updateRequest },
      { ignoreDecorators: true, exposeUnsetFields: false },
    );

    item.updated_by = auth?.id;

    return await this.siteRepo.save(item);
  }

  /**
   * @functionName destroy
   * @author nvtoan27101994@gmail.com
   * @param id
   */
  public async destroy(id: number) {
    const checkItem = await this.findOne(id);

    return await this.siteRepo.softDelete({ id: checkItem.id });
  }

  public async getPossibleSiteInspections(siteId: number): Promise<any> {
    const possibleInspections = await this.possibleInspectionRepo
      .createQueryBuilder("pi")
      .leftJoinAndMapOne("pi.site", SiteEntity, "site", "site.id = pi.site_id")
      .leftJoinAndMapOne(
        "pi.inspectionType",
        InspectionTypeEntity,
        "inspectionType",
        "inspectionType.id = pi.inspection_type_id",
      )
      .where("pi.site_id = :siteId", { siteId })
      .select([
        "pi.id",
        "site.id",
        "site.name",
        "site.name_en",
        "inspectionType.id",
        "inspectionType.inspection_assign_method",
      ])
      .getMany();
    return possibleInspections;
  }

  public async getCommonExceptionDays(): Promise<any> {
    const commonExceptionDays = await this.commonExceptionDaysRepo.find({
      select: ["id", "date", "dayoff_flag", "possible_count", "possible_time_from", "possible_time_to"],
      order: {
        date: "DESC",
      },
    });
    return commonExceptionDays;
  }

  public async getTimeSchedule(param: ScheduleBobyDto): Promise<any> {
    return this.scheduleService.getViewCalendarTime(param);
  }

  public async getDateSchedule(param: ScheduleBobyDto): Promise<any> {
    return this.scheduleService.getViewCalendarDates(param);
  }
}
