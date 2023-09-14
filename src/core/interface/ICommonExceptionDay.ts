export interface ICreateCommonExceptionDay {
  date: Date;
  dayoff_flag: number | null;
  possible_time_from: string | null;
  possible_time_to: string | null;
  possible_count: number | null;
}

export interface IUpdateCommonExceptionDay extends ICreateCommonExceptionDay {
  id: number;
}
