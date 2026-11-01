import { ActivityType } from './activity-type';

export interface UpdateTaskDto {
  name: string;
  description: string;
  type: ActivityType;
  /** @format date-span */
  duration: string;
  /** @format date-time */
  from: string;
  /** @format date-time */
  to: string;
}
