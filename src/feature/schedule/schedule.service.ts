import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import {
  DateSpecifiedTypeExceptionDayEntity,
  MstDateSpecifiedTypeEntity,
  TimeSpecifiedTypeExceptionDayEntity,
  TimeSpecifiedTypeEntity,
} from "src/entities";
import { Repository, Between, FindOperator } from "typeorm";
import { ScheduleBobyDto } from "./dto";
import {
  listDatesFromBeginToEnd,
  findDifferentDates,
  getAvailableCountsByDay,
  getScheduleStandardTimeData,
  groupTimeByDate,
} from "src/utils";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(DateSpecifiedTypeExceptionDayEntity)
    private dateSpecifiedTypeExceptionDayRepo: Repository<DateSpecifiedTypeExceptionDayEntity>,
    @InjectRepository(MstDateSpecifiedTypeEntity)
    private dateSpecifiedTypeRepo: Repository<MstDateSpecifiedTypeEntity>,
    @InjectRepository(TimeSpecifiedTypeExceptionDayEntity)
    private timeSpecifiedTypeExceptionDayRepo: Repository<TimeSpecifiedTypeExceptionDayEntity>,
    @InjectRepository(TimeSpecifiedTypeEntity)
    private timeSpecifiedTypeRepo: Repository<TimeSpecifiedTypeEntity>,
  ) {}

  async getViewCalendarDates(param: ScheduleBobyDto): Promise<any> {
    const { begin, end, site_id, inspection_type_id } = param;
    try {
      const dateSpecifiedTypeExceptionDay = await this.dateSpecifiedTypeExceptionDayRepo.find({
        where: {
          site_id,
          inspection_type_id,
          date: Between(begin, end) as unknown as FindOperator<string>,
        },
      });
      const mstDateSpecifiedType = await this.dateSpecifiedTypeRepo.findOne({
        where: {
          site_id,
          inspection_type_id,
        },
      });
      const listDates = listDatesFromBeginToEnd(begin, end);
      const exceptionDates = dateSpecifiedTypeExceptionDay.map((item) => new Date(item.date));
      const standardDates = findDifferentDates(exceptionDates, listDates);
      const standardDateAvailableData = getAvailableCountsByDay(standardDates, mstDateSpecifiedType);
      const exceptionDateAvailableData = dateSpecifiedTypeExceptionDay.map(
        ({ site_id, inspection_type_id, date, possible_count, dayoff_flag }) => ({
          site_id,
          inspection_type_id,
          date: new Date(date),
          available_count: possible_count,
          dayoff_flag,
        }),
      );

      const sortScheduleDateData = [...exceptionDateAvailableData, ...standardDateAvailableData].sort(
        (a, b) => a.date.getTime() - b.date.getTime(),
      );

      return sortScheduleDateData.map((item) => ({
        ...item,
        date: moment(item.date).format("YYYY-MM-DD"),
        quantity_received: 0,
      }));
    } catch (error) {
      throw error;
    }
  }

  async getViewCalendarTime(param: ScheduleBobyDto): Promise<any> {
    const { begin, end, site_id, inspection_type_id } = param;
    try {
      const timeSpecifiedTypeExceptionDay = await this.timeSpecifiedTypeExceptionDayRepo.find({
        where: {
          site_id,
          inspection_type_id,
          date: Between(begin, end) as unknown as FindOperator<string>,
        },
      });
      const timeSpecifiedType = await this.timeSpecifiedTypeRepo.find({
        where: {
          site_id,
          inspection_type_id,
        },
      });
      const listDates = listDatesFromBeginToEnd(begin, end);
      const exceptionDates = timeSpecifiedTypeExceptionDay.map((item) => new Date(item.date));
      const standardDates = findDifferentDates(exceptionDates, listDates);
      const standardTimeAvailableData = groupTimeByDate(getScheduleStandardTimeData(standardDates, timeSpecifiedType));
      const exceptionTimeAvailableData = groupTimeByDate(timeSpecifiedTypeExceptionDay);
      const sortScheduleDateData = [...exceptionTimeAvailableData, ...standardTimeAvailableData].sort(
        (a, b) => a.date - b.date,
      );

      return sortScheduleDateData.map((item) => ({
        ...item,
        date: moment(item.date).format("YYYY-MM-DD"),
        times_received: [],
      }));
    } catch (error) {
      throw error;
    }
  }
}
