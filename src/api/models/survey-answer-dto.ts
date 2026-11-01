import { CircadianWindowDto } from './circadian-window-dto';

export interface SurveyAnswerDto {
  /** @format date-span */
  wakeTime: string;
  /** @format date-span */
  sleepTime: string;
  /** @format date-span */
  freeDayWakeTime: string;
  /** @format date-span */
  freeDaySleepTime: string;
  peakPeriods: CircadianWindowDto[];
}
