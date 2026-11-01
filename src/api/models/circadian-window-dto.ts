import { ActivityType } from './activity-type';

export interface CircadianWindowDto {
  /** @format date-span */
  start: string;
  /** @format date-span */
  end: string;
  activity: ActivityType;
}
