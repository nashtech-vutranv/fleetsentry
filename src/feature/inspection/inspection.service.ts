import { Injectable } from "@nestjs/common";
import { IAuth } from "src/core/interface";
import { InspectionDto, FilterDto } from "./dto";
import { InjectRepository } from "@nestjs/typeorm";
import {
  InspectionScheduleResultEntity,
  InspectionTypeEntity,
  SiteEntity,
  InspectorEntity,
  UserEntity,
} from "src/entities";
import { Brackets, Repository, SelectQueryBuilder } from "typeorm";
import { IPaginateReq } from "src/core/decorators";
import { Paginate } from "src/utils";
import { AppException } from "src/core/exceptions";
import { ErrorCode } from "src/enums";

type IInspectorWithUser = InspectionTypeEntity & { user: UserEntity };
type IInspectionFullInfo = InspectionScheduleResultEntity & {
  inspected_site: SiteEntity;
  inspected_inspector: IInspectorWithUser;
  inspection_type: InspectionTypeEntity;
};

function InputOutputValidator(err_code: ErrorCode) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const innerMethod = descriptor.value;
    descriptor.value = async function (...args: any) {
      if (args[0].length === 0) return [];
      const result = await innerMethod.apply(this, [...args]);

      if (result.length !== args[0].length) throw new AppException(err_code);
      return result;
    };
  };
}

@Injectable()
export class InspectionService {
  constructor(
    @InjectRepository(InspectionScheduleResultEntity)
    private inspectionRepo: Repository<InspectionScheduleResultEntity>,

    @InjectRepository(InspectionTypeEntity)
    private inspectionTypeRepo: Repository<InspectionTypeEntity>,

    @InjectRepository(SiteEntity) private siteRepo: Repository<SiteEntity>,

    @InjectRepository(InspectorEntity) private inspectorRepo: Repository<InspectorEntity>,
  ) {}

  /**
   * @author vuducdung93@gmail.com
   * @param auth
   * @param paginateReq
   * @param query
   */
  public async filter(auth: IAuth, paginateReq: IPaginateReq, filterDto?: FilterDto): Promise<Paginate> {
    const take = paginateReq.size * paginateReq.page;
    const [inspections, total] = await this._createFilterQuery(auth, filterDto)
      .setFindOptions({
        take: take,
        skip: take - paginateReq.size,
      })
      .getManyAndCount();

    const result = await this.attachInfoInspections(inspections);
    return new Paginate(InspectionDto.plainToInstance(result), total, paginateReq.page, paginateReq.size);
  }

  /**
   * attach more informations inspection
   * @param inspections
   */
  public async attachInfoInspections(inspections: InspectionScheduleResultEntity[]): Promise<IInspectionFullInfo[]> {
    const inspectionTypeIds = new Set<number>();
    const siteIds = new Set<number>();
    const inspectorIds = new Set<number>();
    for (const ins of inspections) {
      inspectionTypeIds.add(ins.inspection_type_id);
      ins.inspected_site_id && siteIds.add(ins.inspected_site_id);
      ins.inspected_inspector_id && inspectorIds.add(ins.inspected_inspector_id);
    }

    const [inspectionTypes, sites, inspectors] = await Promise.all([
      this.getInspectionTypeByIds(Array.from(inspectionTypeIds)),
      this.getSiteByIds(Array.from(siteIds)),
      this.getInspectorByIds(Array.from(inspectorIds)),
    ]);
    return inspections.map((ins) => {
      return {
        ...ins,
        inspected_site: sites.find((site) => site.id === ins.inspected_site_id),
        inspected_inspector: inspectors.find((inspector) => inspector.id === ins.inspected_inspector_id),
        inspection_type: inspectionTypes.find((type) => type.id === ins.inspection_type_id),
      };
    });
  }

  /**
   * @param auth
   * @param query
   */
  private _createFilterQuery(auth: IAuth, filterDto?: FilterDto): SelectQueryBuilder<InspectionScheduleResultEntity> {
    let inspectionsQuery = this.inspectionRepo.createQueryBuilder("ins").where("ins.company_code = :company_code", {
      company_code: auth.company_code,
    });
    if (filterDto) {
      inspectionsQuery.andWhere(
        new Brackets((q) => {
          const keys = Object.keys(filterDto) as Array<keyof FilterDto>;
          for (const key of keys) {
            const operator = typeof filterDto[key] === "string" && key !== "inspected_date" ? "like" : "=";

            q.andWhere(`ins.${key} ${operator} :${key}`, { [key]: filterDto[key] });
          }
        }),
      );
    }
    return inspectionsQuery;
  }

  /**
   * @param ids
   */
  @InputOutputValidator(ErrorCode.E111000)
  public async getInspectionTypeByIds(ids: number[]): Promise<InspectionTypeEntity[]> {
    //TODO: load cache

    return this.inspectionTypeRepo
      .createQueryBuilder("ins-type")
      .where("ins-type.id IN (:...ids)", { ids: ids })
      .getMany();
  }

  @InputOutputValidator(ErrorCode.E130000)
  public async getSiteByIds(ids: number[]): Promise<SiteEntity[]> {
    //TODO: load cache
    return this.siteRepo.createQueryBuilder("site").where("site.id IN (:...ids)", { ids: ids }).getMany();
  }

  /**
   * @param ids
   */
  @InputOutputValidator(ErrorCode.E120002)
  public async getInspectorByIds(ids: number[]): Promise<IInspectorWithUser[]> {
    //TODO: load cache
    return this.inspectorRepo
      .createQueryBuilder("inspector")
      .leftJoinAndMapOne("inspector.user", UserEntity, "user", "user.id = inspector.user_id")
      .where("inspector.id IN (:...ids)", { ids: ids })
      .getMany() as any;
  }
}
