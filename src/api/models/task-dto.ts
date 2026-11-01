import { ActivityType } from './activity-type';

export interface TaskDto {
  name: string;
  description: string;
  type: ActivityType;
  /** @format date-span */
  duration: string;
  /** @format uuid */
  ownerId: string;
  /** @format uuid */
  id: string;
  /** @format date-time */
  created: string;
  /** @format date-time */
  updated: string;
  /** @format date-time */
  from: string;
  /** @format date-time */
  to: string;
}
