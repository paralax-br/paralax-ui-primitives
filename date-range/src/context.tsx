import {
  addMonths,
  addYears,
  setDate,
  setHours,
  setMinutes,
  setMonth,
  setYear,
  subMonths,
  subYears,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  addHours,
  subHours,
  addMinutes,
  subMinutes,
  setWeek,
  getWeekYear,
  isBefore,
  isAfter,
  setSeconds,
  setMilliseconds,
  isSameDay,
  isSameMonth,
  isSameHour,
  isSameMinute,
  isSameSecond,
  isWithinInterval,
  isSameYear,
  isSameWeek,
} from 'date-fns';
import React, { ReactNode, createContext, useContext } from 'react';
import {
  TakeWeekDaysParams,
  takeMonth,
  takeWeek,
  takeWeekDays,
} from './services';
import { Interval, Month, Week } from './types';
import { arrayRange } from './utils';

interface RangeCalendarContextProps {
  loading?: boolean;
  value: Interval;
  calendarDate: Date;
  onValueChange?: (value: Interval) => void;
  onCalendarDateChange?: (calendarDate: Date) => void;
  previousYear: () => void;
  nextYear: () => void;
  previousMonth: () => void;
  nextMonth: () => void;
  previousWeek: () => void;
  nextWeek: () => void;
  nextDay: () => void;
  previousDay: () => void;
  nextHour: () => void;
  previousHour: () => void;
  nextMinute: () => void;
  previousMinute: () => void;
  getWeekDays: (params: TakeWeekDaysParams) => string[];
  getActiveRowByYear: (year: number, yearsArray: number[][]) => number;
  getWeek: (start?: Date) => () => Week;
  separateYears: (years: number[], size?: number) => number[][];
  monthData: Month;
  changeYear: (year: number, current: Date) => Date;
  changeMonth: (month: number, current: Date) => Date;
  changeWeek: (week: Date, current: Date) => Date;
  changeDay: (day: Date, current: Date) => Date;
  changeHours: (hours: number, current: Date) => Date;
  changeMinutes: (minutes: number, current: Date) => Date;
  changeSeconds: (seconds: number, current: Date) => Date;
  changeMilliseconds: (milliseconds: number, current: Date) => Date;
  years: number[];
  hours: number[];
  minutes: number[];
  now: Date;
  onChangeYear: (year: number) => void;
  onChangeMonth: (month: number) => void;
  onChangeWeek: (week: Date) => void;
  onChangeDay: (day: Date) => void;
  onChangeHours: (hours: number) => void;
  onChangeMinutes: (minutes: number) => void;
  onChangeSeconds: (seconds: number) => void;
  onChangeMilliseconds: (milliseconds: number) => void;
  isStartMillisecond: (millisecond: number) => boolean;
  isEndMillisecond: (millisecond: number) => boolean;
  isStartSecond: (second: number) => boolean;
  isEndSecond: (second: number) => boolean;
  isStartMinute: (minute: number) => boolean;
  isEndMinute: (minute: number) => boolean;
  isStartHour: (hour: number) => boolean;
  isEndHour: (hour: number) => boolean;
  isStartDay: (day: Date) => boolean;
  isEndDay: (day: Date) => boolean;
  isStartWeek: (week: number) => boolean;
  isEndWeek: (week: number) => boolean;
  isStartMonth: (month: number) => boolean;
  isEndMonth: (month: number) => boolean;
  isStartYear: (year: number) => boolean;
  isEndYear: (year: number) => boolean;
  isMillisecondSelected: (millisecond: number) => boolean;
  isSecondSelected: (second: number) => boolean;
  isMinuteSelected: (minute: number) => boolean;
  isHourSelected: (hour: number) => boolean;
  isDaySelected: (day: Date) => boolean;
  isWeekSelected: (week: number) => boolean;
  isMonthSelected: (month: number) => boolean;
  isYearSelected: (year: number) => boolean;
  isWeekStartDay: (weekIndex: number) => boolean;
  isWeekEndDay: (week: Week, weekIndex: number) => boolean;
  isInOtherMonth: (day: Date) => boolean;
  isInRange: (date: Date | number) => void;
}

const RangeCalendarContext = createContext<RangeCalendarContextProps>(
  {} as RangeCalendarContextProps
);

interface RangeCalendarProviderProps {
  children: ReactNode;
  loading?: boolean;
  value: Interval;
  calendarDate: Date;
  onValueChange: (value: Interval) => void;
  onCalendarDateChange: (calendarDate: Date) => void;
}

export const RangeCalendarProvider = (props: RangeCalendarProviderProps) => {
  const {
    children,
    calendarDate,
    value,
    onCalendarDateChange,
    onValueChange,
    loading,
  } = props;

  const previousYear = () => {
    onCalendarDateChange(subYears(calendarDate, 1));
  };

  const nextYear = () => {
    onCalendarDateChange(addYears(calendarDate, 1));
  };

  const previousMonth = () => {
    onCalendarDateChange(subMonths(calendarDate, 1));
  };

  const nextMonth = () => {
    onCalendarDateChange(addMonths(calendarDate, 1));
  };

  const previousWeek = () => {
    onCalendarDateChange(subWeeks(calendarDate, 1));
  };

  const nextWeek = () => {
    onCalendarDateChange(addWeeks(calendarDate, 1));
  };

  const previousDay = () => {
    onCalendarDateChange(subDays(calendarDate, 1));
  };

  const nextDay = () => {
    onCalendarDateChange(addDays(calendarDate, 1));
  };

  const previousHour = () => {
    onCalendarDateChange(subHours(calendarDate, 1));
  };

  const nextHour = () => {
    onCalendarDateChange(addHours(calendarDate, 1));
  };

  const previousMinute = () => {
    onCalendarDateChange(subMinutes(calendarDate, 1));
  };

  const nextMinute = () => {
    onCalendarDateChange(addMinutes(calendarDate, 1));
  };

  const getWeekDays = takeWeekDays;
  const getWeek = takeWeek;

  const getActiveRowByYear = (year: number, yearsArray: number[][]) => {
    return yearsArray.findIndex(subArray => subArray.includes(year));
  };

  const monthData = takeMonth(calendarDate)();

  const separateYears = (years: number[], size: number = 4): number[][] =>
    years.reduce((acc: number[][], curr, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(curr);
      return acc;
    }, []);

  const changeDay = (day: Date, current: Date) => {
    current = setMonth(current, day.getMonth());
    current = setDate(current, day.getDate());
    return current;
  };

  const changeWeek = (week: Date, current: Date) => {
    current = setWeek(current, getWeekYear(week));
    return current;
  };

  const changeMonth = (month: number, current: Date) => {
    current = setMonth(current, month);
    return current;
  };

  const changeYear = (year: number, current: Date) => {
    current = setYear(current, year);
    return current;
  };

  const changeHours = (hours: number, current: Date) => {
    current = setHours(current, hours);
    return current;
  };

  const changeMinutes = (minutes: number, current: Date) => {
    current = setMinutes(current, minutes);
    return current;
  };

  const changeSeconds = (seconds: number, current: Date) => {
    current = setSeconds(current, seconds);
    return current;
  };

  const changeMilliseconds = (milliseconds: number, current: Date) => {
    current = setMilliseconds(current, milliseconds);
    return current;
  };

  const onChangeDay = (day: Date) => {
    if (isBefore(day, value.start)) {
      onCalendarDateChange(changeDay(day, value.start));
      onValueChange({
        start: changeDay(day, value.start),
        end: value.start,
      });
    }

    if (isBefore(day, value.end)) {
      onCalendarDateChange(changeDay(day, value.start));
      onValueChange({
        start: changeDay(day, value.start),
        end: value.end,
      });
    }

    if (isAfter(day, value.start)) {
      onCalendarDateChange(changeDay(day, value.end));
      onValueChange({
        start: value.start,
        end: changeDay(day, value.end),
      });
    }

    if (isAfter(day, value.end)) {
      onCalendarDateChange(changeDay(day, value.end));
      onValueChange({
        start: value.end,
        end: changeDay(day, value.end),
      });
    }
  };

  const onChangeMonth = (month: number) => {
    if (isBefore(month, value.start)) {
      onCalendarDateChange(changeMonth(month, value.start));
      onValueChange({
        start: changeMonth(month, value.start),
        end: value.start,
      });
    }

    if (isBefore(month, value.end)) {
      onCalendarDateChange(changeMonth(month, value.start));
      onValueChange({
        start: changeMonth(month, value.start),
        end: value.end,
      });
    }

    if (isAfter(month, value.start)) {
      onCalendarDateChange(changeMonth(month, value.end));
      onValueChange({
        start: value.start,
        end: changeMonth(month, value.end),
      });
    }

    if (isAfter(month, value.end)) {
      onCalendarDateChange(changeMonth(month, value.end));
      onValueChange({
        start: value.end,
        end: changeMonth(month, value.end),
      });
    }
  };

  const onChangeYear = (year: number) => {
    if (isBefore(year, value.start)) {
      onCalendarDateChange(changeYear(year, value.start));
      onValueChange({
        start: changeYear(year, value.start),
        end: value.start,
      });
    }

    if (isBefore(year, value.end)) {
      onCalendarDateChange(changeYear(year, value.start));
      onValueChange({
        start: changeYear(year, value.start),
        end: value.end,
      });
    }

    if (isAfter(year, value.start)) {
      onCalendarDateChange(changeYear(year, value.end));
      onValueChange({
        start: value.start,
        end: changeYear(year, value.end),
      });
    }

    if (isAfter(year, value.end)) {
      onCalendarDateChange(changeYear(year, value.end));
      onValueChange({
        start: value.end,
        end: changeYear(year, value.end),
      });
    }
  };

  const onChangeWeek = (week: Date) => {
    if (isBefore(week, value.start)) {
      onCalendarDateChange(changeWeek(week, value.start));
      onValueChange({
        start: changeWeek(week, value.start),
        end: value.start,
      });
    }

    if (isBefore(week, value.end)) {
      onCalendarDateChange(changeWeek(week, value.start));
      onValueChange({
        start: changeWeek(week, value.start),
        end: value.end,
      });
    }

    if (isAfter(week, value.start)) {
      onCalendarDateChange(changeWeek(week, value.end));
      onValueChange({
        start: value.start,
        end: changeWeek(week, value.end),
      });
    }

    if (isAfter(week, value.end)) {
      onCalendarDateChange(changeWeek(week, value.end));
      onValueChange({
        start: value.end,
        end: changeWeek(week, value.end),
      });
    }
  };

  const onChangeHours = (hour: number) => {
    if (isBefore(hour, value.start)) {
      onCalendarDateChange(changeHours(hour, value.start));
      onValueChange({
        start: changeHours(hour, value.start),
        end: value.start,
      });
    }

    if (isBefore(hour, value.end)) {
      onCalendarDateChange(changeHours(hour, value.start));
      onValueChange({
        start: changeHours(hour, value.start),
        end: value.end,
      });
    }

    if (isAfter(hour, value.start)) {
      onCalendarDateChange(changeHours(hour, value.end));
      onValueChange({
        start: value.start,
        end: changeHours(hour, value.end),
      });
    }

    if (isAfter(hour, value.end)) {
      onCalendarDateChange(changeHours(hour, value.end));
      onValueChange({
        start: value.end,
        end: changeHours(hour, value.end),
      });
    }
  };

  const onChangeMinutes = (minutes: number) => {
    if (isBefore(minutes, value.start)) {
      onCalendarDateChange(changeMinutes(minutes, value.start));
      onValueChange({
        start: changeMinutes(minutes, value.start),
        end: value.start,
      });
    }

    if (isBefore(minutes, value.end)) {
      onCalendarDateChange(changeMinutes(minutes, value.start));
      onValueChange({
        start: changeMinutes(minutes, value.start),
        end: value.end,
      });
    }

    if (isAfter(minutes, value.start)) {
      onCalendarDateChange(changeMinutes(minutes, value.end));
      onValueChange({
        start: value.start,
        end: changeMinutes(minutes, value.end),
      });
    }

    if (isAfter(minutes, value.end)) {
      onCalendarDateChange(changeMinutes(minutes, value.end));
      onValueChange({
        start: value.end,
        end: changeMinutes(minutes, value.end),
      });
    }
  };

  const onChangeSeconds = (seconds: number) => {
    if (isBefore(seconds, value.start)) {
      onCalendarDateChange(changeSeconds(seconds, value.start));
      onValueChange({
        start: changeSeconds(seconds, value.start),
        end: value.start,
      });
    }

    if (isBefore(seconds, value.end)) {
      onCalendarDateChange(changeSeconds(seconds, value.start));
      onValueChange({
        start: changeSeconds(seconds, value.start),
        end: value.end,
      });
    }

    if (isAfter(seconds, value.start)) {
      onCalendarDateChange(changeSeconds(seconds, value.end));
      onValueChange({
        start: value.start,
        end: changeSeconds(seconds, value.end),
      });
    }

    if (isAfter(seconds, value.end)) {
      onCalendarDateChange(changeSeconds(seconds, value.end));
      onValueChange({
        start: value.end,
        end: changeSeconds(seconds, value.end),
      });
    }
  };

  const onChangeMilliseconds = (milliseconds: number) => {
    if (isBefore(milliseconds, value.start)) {
      onCalendarDateChange(changeMilliseconds(milliseconds, value.start));
      onValueChange({
        start: changeMilliseconds(milliseconds, value.start),
        end: value.start,
      });
    }

    if (isBefore(milliseconds, value.end)) {
      onCalendarDateChange(changeMilliseconds(milliseconds, value.start));
      onValueChange({
        start: changeMilliseconds(milliseconds, value.start),
        end: value.end,
      });
    }

    if (isAfter(milliseconds, value.start)) {
      onCalendarDateChange(changeMilliseconds(milliseconds, value.end));
      onValueChange({
        start: value.start,
        end: changeMilliseconds(milliseconds, value.end),
      });
    }

    if (isAfter(milliseconds, value.end)) {
      onCalendarDateChange(changeMilliseconds(milliseconds, value.end));
      onValueChange({
        start: value.end,
        end: changeMilliseconds(milliseconds, value.end),
      });
    }
  };

  const now = new Date();
  const years = arrayRange(1900, 2099, 1);
  const hours = arrayRange(0, 23, 1);
  const minutes = arrayRange(0, 59, 1);

  const isStartMillisecond = (millisecond: number) =>
    value.start.getMilliseconds() === millisecond;
  const isEndMillisecond = (millisecond: number) =>
    value.end.getMilliseconds() === millisecond;

  const isStartSecond = (second: number) => isSameSecond(second, value.start);
  const isEndSecond = (second: number) => isSameSecond(second, value.end);

  const isStartMinute = (minute: number) => isSameMinute(minute, value.start);
  const isEndMinute = (minute: number) => isSameMinute(minute, value.end);

  const isStartHour = (hour: number) => isSameHour(hour, value.start);
  const isEndHour = (hour: number) => isSameHour(hour, value.end);

  const isStartDay = (day: Date) => isSameDay(day, value.start);
  const isEndDay = (day: Date) => isSameDay(day, value.end);

  const isStartWeek = (week: Date | number) => isSameWeek(week, value.start);
  const isEndWeek = (week: Date | number) => isSameWeek(week, value.end);

  const isStartMonth = (month: number) => isSameMonth(month, value.start);
  const isEndMonth = (month: number) => isSameMonth(month, value.end);

  const isStartYear = (year: number) => isSameYear(year, value.start);
  const isEndYear = (year: number) => isSameYear(year, value.end);

  const isMillisecondSelected = (millisecond: number) =>
    isStartMillisecond(millisecond) || isEndMillisecond(millisecond);

  const isSecondSelected = (second: number) =>
    isStartSecond(second) || isEndSecond(second);

  const isMinuteSelected = (minute: number) =>
    isStartMinute(minute) || isEndMinute(minute);

  const isHourSelected = (hour: number) => isStartHour(hour) || isEndHour(hour);

  const isDaySelected = (day: Date) => isStartDay(day) || isEndDay(day);

  const isWeekSelected = (week: Date | number) =>
    isStartWeek(week) || isEndWeek(week);

  const isMonthSelected = (month: number) =>
    isStartMonth(month) || isEndMonth(month);

  const isYearSelected = (year: number) => isStartYear(year) || isEndYear(year);

  const isInRange = (date: Date | number) => {
    isWithinInterval(date, value);
  };

  const isInOtherMonth = (day: Date) => !isSameMonth(day, calendarDate);

  const isWeekStartDay = (weekIndex: number) => !weekIndex;
  const isWeekEndDay = (week: Week, weekIndex: number) =>
    week.length === weekIndex + 1;

  const contextValue: RangeCalendarContextProps = {
    value,
    onCalendarDateChange,
    onValueChange,
    loading,
    calendarDate,
    now,
    years,
    hours,
    minutes,
    getWeekDays,
    getActiveRowByYear,
    getWeek,
    separateYears,
    monthData,
    changeYear,
    changeMonth,
    changeWeek,
    changeDay,
    changeHours,
    changeMinutes,
    changeSeconds,
    changeMilliseconds,
    onChangeMilliseconds,
    onChangeSeconds,
    onChangeMinutes,
    onChangeHours,
    onChangeDay,
    onChangeWeek,
    onChangeMonth,
    onChangeYear,
    isDaySelected,
    isEndDay,
    isEndHour,
    isEndMillisecond,
    isEndMinute,
    isEndMonth,
    isEndSecond,
    isEndWeek,
    isEndYear,
    isHourSelected,
    isMillisecondSelected,
    isMinuteSelected,
    isMonthSelected,
    isSecondSelected,
    isStartDay,
    isStartHour,
    isStartMillisecond,
    isStartMinute,
    isStartMonth,
    isStartSecond,
    isStartWeek,
    isStartYear,
    isWeekSelected,
    isYearSelected,
    isInOtherMonth,
    isInRange,
    isWeekEndDay,
    isWeekStartDay,
    nextMinute,
    nextHour,
    nextDay,
    nextWeek,
    nextMonth,
    nextYear,
    previousMinute,
    previousHour,
    previousDay,
    previousWeek,
    previousMonth,
    previousYear,
  };

  return (
    <RangeCalendarContext.Provider value={contextValue}>
      {children}
    </RangeCalendarContext.Provider>
  );
};

export const useRangeCalendar = () => {
  const context = useContext(RangeCalendarContext);

  return context;
};
