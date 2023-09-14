import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InspectorEntity, InspectorScheduleEntity } from "src/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { IAuth } from "src/core/interface";
import { InspectorScheduleDto } from "./dto";

@Injectable()
export class InspectorScheduleService {
  constructor(
    @InjectRepository(InspectorScheduleEntity) private inspectorScheduleRepo: Repository<InspectorScheduleEntity>,
    @InjectRepository(InspectorEntity) private inspectorRepo: Repository<InspectorEntity>,
  ) {}

  /**
   * @function create many inspector schedule
   * @param auth
   * @param bodyInspectorSchedules
   * @description Create many inspector schedule
   * @returns {Promise<any>}
   */
  public async createMany(auth: IAuth, bodyInspectorSchedules: InspectorScheduleDto[]): Promise<any> {
    for (const schedule of bodyInspectorSchedules as any) {
      if (schedule.id) {
        // If the schedule has an ID, it already exists, so update it.
        await this.inspectorScheduleRepo.update(schedule.id, {
          ...schedule,
          inspector_id: auth.id,
          company_code: auth.company_code,
        });
      } else {
        // If the schedule does not have an ID, it's a new record, so create it.
        await this.inspectorScheduleRepo.save(
          this.inspectorScheduleRepo.create({ ...schedule, inspector_id: auth.id, company_code: auth.company_code }),
        );
      }
    }
  }

  /**
   * @function get inspector schedule by inspector id and from date and to date
   * @param inspectorId
   * @param fromDate
   * @param toDate
   * @description Get inspector schedule by inspector id and from date and to date
   * @returns {Promise<any>}
   */
  public async getInspectorScheduleMonthly(inspectorId: number, fromDate: string, toDate: string): Promise<any> {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    return this.inspectorScheduleRepo
      .createQueryBuilder("inspector_schedule")
      .where("inspector_schedule.inspector_id = :inspectorId", { inspectorId })
      .andWhere("inspector_schedule.date >= :from", { from })
      .andWhere("inspector_schedule.date <= :to", { to })
      .getMany();
  }

  /**
   * @function get inspector schedule weekly from date and to date
   * @param areaId
   * @param fromDate
   * @param toDate
   * @description Get inspector schedule weekly from date and to date
   * @returns {Promise<any>}
   */
  public async getInspectorScheduleWeekly(areaId: string, fromDate: string, toDate: string): Promise<any> {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const selectFields = [
      "inspector.id",
      "user.id",
      "user.lastname",
      "user.firstname",
      "user.lastname_kana",
      "user.firstname_kana",
      "user.lastname_en",
      "user.firstname_en",
      "user.email",
      "user.language",
      "inspector_schedule.id",
      "inspector_schedule.date",
      "inspector_schedule.operating_time_from",
      "inspector_schedule.operating_time_to",
      "inspector_schedule.dayoff_flag",
    ];

    // Case 1: areaID is null => get all inspectors
    // return []
    // Case 2: areaID is not null => get inspectors by area_id
    return await this.inspectorRepo
      .createQueryBuilder("inspector")
      .innerJoin("inspector.user", "user")
      .leftJoinAndMapMany(
        "inspector.inspectorSchedules",
        InspectorScheduleEntity,
        "inspector_schedule",
        "inspector_schedule.inspector_id = inspector.id",
      )
      .where("inspector_schedule.date >= :from", { from })
      .andWhere("inspector_schedule.date <= :to", { to })
      .select(selectFields)
      .getMany();
  }
}
