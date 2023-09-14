export interface IBaseScheduleTime {
  id: number;
  company_code: string;
  site_id: number;
  inspection_type_id: number;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

export interface TimeSpecifiedTypeExceptionDayEntity extends IBaseScheduleTime {
  date: string;
  dayoff_flag: number;
  available_time_from?: string;
  available_time_to?: string;
  exception_time_from?: string;
  exception_time_to?: string;
  possible_time_from?: string;
  possible_time_to?: string;
}

export interface TimeSpecifiedTypeEntity extends IBaseScheduleTime {
  monday_available_from: string;
  monday_available_to: string;
  monday_exception_from: string;
  monday_exception_to: string;
  tuesday_available_from: string;
  tuesday_available_to: string;
  tuesday_exception_from: string;
  tuesday_exception_to: string;
  wednesday_available_from: string;
  wednesday_available_to: string;
  wednesday_exception_from: string;
  wednesday_exception_to: string;
  thursday_available_from: string;
  thursday_available_to: string;
  thursday_exception_from: string;
  thursday_exception_to: string;
  friday_available_from: string;
  friday_available_to: string;
  friday_exception_from: string;
  friday_exception_to: string;
  saturday_available_from: string;
  saturday_available_to: string;
  saturday_exception_from: string;
  saturday_exception_to: string;
  sunday_available_from: string;
  sunday_available_to: string;
  sunday_exception_from: string;
  sunday_exception_to: string;
}

export interface IScheduleTime {
  site_id: number;
  inspection_type_id: number;
  available_time_from?: string;
  available_time_to?: string;
  exception_time_from?: string;
  exception_time_to?: string;
  possible_time_from?: string;
  possible_time_to?: string;
}

export interface IGroupScheduleTimeResult {
  date: any;
  time: IScheduleTime[];
}
