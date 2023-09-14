/**
 * @function today
 * @author vungpv93@gmail.com
 */

import * as moment from "moment";
import * as _ from "lodash";
import { daysOfWeek } from "../constants";
import {
  TimeSpecifiedTypeExceptionDayEntity,
  TimeSpecifiedTypeEntity,
  IGroupScheduleTimeResult,
} from "src/core/interface";

export const today = () => {
  return "2023-07-01";
};

export const listDatesFromBeginToEnd = (begin: Date, end: Date) => {
  const dates: Date[] = [];
  const currentDate = new Date(begin);
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

export const findDifferentDates = (filterDates: Date[], dateList: Date[]) => {
  const differentDates: Date[] = [];
  for (const date of dateList) {
    if (!filterDates.some((filterDate) => filterDate.getTime() === date.getTime())) {
      differentDates.push(date);
    }
  }
  return differentDates;
};

export const getDayOfWeek = (date: Date) => {
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};

export const getAvailableCountsByDay = (dates: Date[], availableCountObj: Record<string, any>) => {
  const { site_id, inspection_type_id } = availableCountObj;
  const result = dates.map((date) => {
    const dayIndex = date.getDay();
    const dayOfWeekName = daysOfWeek[dayIndex];
    const availableCountKey = `${dayOfWeekName}_available_count`;
    return {
      site_id,
      inspection_type_id,
      date,
      available_count: availableCountObj[availableCountKey],
    };
  });
  return result;
};

export const getScheduleStandardTimeData = (
  standardDates: Date[],
  timeSpecifiedData: Partial<TimeSpecifiedTypeEntity>[],
) => {
  let timeData: Partial<TimeSpecifiedTypeExceptionDayEntity>[] = [];
  timeSpecifiedData.forEach((item) => {
    const { site_id, inspection_type_id } = item;
    const result = standardDates.map((date) => {
      const dayIndex = date.getDay();
      const dayOfWeekName = daysOfWeek[dayIndex];
      const availableTimeFromKey = `${dayOfWeekName}_available_time_from`;
      const availableTimeToKey = `${dayOfWeekName}_available_time_to`;
      const exceptionTimeFromKey = `${dayOfWeekName}_exception_time_from`;
      const exceptionTimeToKey = `${dayOfWeekName}_exception_time_to`;
      const data: Partial<TimeSpecifiedTypeExceptionDayEntity> = {
        site_id,
        inspection_type_id,
        date: date.toString(),
        available_time_from: item[availableTimeFromKey],
        available_time_to: item[availableTimeToKey],
        exception_time_from: item[exceptionTimeFromKey],
        exception_time_to: item[exceptionTimeToKey],
      };
      return data;
    });
    timeData = [...timeData, ...result];
  });
  return timeData;
};

export const groupTimeByDate = (list: Partial<TimeSpecifiedTypeExceptionDayEntity>[]) => {
  const tranformList = list.map((item) => ({
    ...item,
    date: moment(item.date).format("YYYY-MM-DD"),
  }));

  const grouped = _.groupBy(tranformList, "date");

  const result: IGroupScheduleTimeResult[] = [];

  for (const date in grouped) {
    result.push({
      date,
      time: grouped[date].map((item) => {
        const {
          site_id,
          inspection_type_id,
          date,
          possible_time_from,
          possible_time_to,
          available_time_from,
          available_time_to,
          exception_time_from,
          exception_time_to,
          dayoff_flag,
        } = item;
        return {
          site_id,
          inspection_type_id,
          date,
          possible_time_from,
          possible_time_to,
          available_time_from,
          available_time_to,
          exception_time_from,
          exception_time_to,
          dayoff_flag,
        };
      }),
    });
  }

  return result;
};

/**
 * @functionName convertMinuteToTime
 * @param minutes
 * @returns formattedTime: "hh:mm:ss"
 */
export const convertMinuteToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${remainingMinutes.toString().padStart(2, "0")}:00`;
  return formattedTime;
};
