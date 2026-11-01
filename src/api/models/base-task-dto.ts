import { ActivityType } from './activity-type';

export interface BaseTaskDto {
  name: string;
  description: string;
  type: ActivityType;
  /** @format date-span */
  duration: string;
}
