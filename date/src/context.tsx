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
  setSeconds,
  setMilliseconds,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import React, { ReactNode, createContext, useContext } from 'react';
import {
  TakeWeekDaysParams,
  takeMonth,
  takeWeek,
  takeWeekDays,
} from './services';
import { Month, Week } from './types';
import { arrayRange } from './utils';

interface CalendarContextProps {
  loading?: boolean;
  value: Date;
  calendarDate: Date;
  onValueChange?: (value: Date) => void;
  onCalendarDateChange?: (calendarDate: Date) => void;
  isCurrentCalendarDay: (day: Date) => boolean;
  isCurrentDay: (day: Date) => boolean;
  isDaySelected: (day: Date) => boolean;
  isDiferentMonth: (day: Date) => boolean;
  isCurrentCalendarYear: (year: number) => boolean;
  isCurrentYear: (year: number) => boolean;
  isYearSelected: (year: number) => boolean;
  isCurrentCalendarMonth: (month: number) => boolean;
  isCurrentMonth: (month: number) => boolean;
  isMonthSelected: (month: number) => boolean;
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
  getMonthData: (date: Date) => Month;
  getActiveRowByYear: (year: number, yearsArray: number[][]) => number;
  separateYears: (years: number[], size?: number) => number[][];
  getWeeks: (date: Date) => Week;
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
}

const CalendarContext = createContext<CalendarContextProps>(
  {} as CalendarContextProps
);

interface CalendarProviderProps {
  children: ReactNode;
  loading?: boolean;
  value: Date;
  calendarDate: Date;
  onValueChange: (value: Date) => void;
  onCalendarDateChange: (calendarDate: Date) => void;
}

export const CalendarProvider = (props: CalendarProviderProps) => {
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
  const getWeeks = (date: Date) => takeWeek(date)();
  const getMonthData = (date: Date) => takeMonth(date)();

  const isCurrentCalendarDay = (day: Date) => isSameDay(day, calendarDate);
  const isCurrentDay = (day: Date) => isSameDay(day, new Date());
  const isDaySelected = (day: Date) => isSameDay(day, value);
  const isDiferentMonth = (day: Date) => !isSameMonth(day, calendarDate);
  const isCurrentCalendarYear = (year: number) =>
    calendarDate?.getFullYear() === year;
  const isCurrentYear = (year: number) => year == new Date().getFullYear();
  const isYearSelected = (year: number) => value.getFullYear() === year;
  const isCurrentCalendarMonth = (month: number) =>
    calendarDate.getMonth() === month;
  const isCurrentMonth = (month: number) => month === new Date().getMonth();
  const isMonthSelected = (month: number) => value.getMonth() === month;

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
    onCalendarDateChange(changeDay(day, value));
    onValueChange(changeDay(day, value));
  };

  const onChangeMonth = (month: number) => {
    onCalendarDateChange(changeMonth(month, value));
    onValueChange(changeMonth(month, value));
  };

  const onChangeYear = (year: number) => {
    onCalendarDateChange(changeYear(year, value));
    onValueChange(changeYear(year, value));
  };

  const onChangeWeek = (week: Date) => {
    onCalendarDateChange(changeWeek(week, value));
    onValueChange(changeWeek(week, value));
  };

  const onChangeHours = (hour: number) => {
    onCalendarDateChange(changeHours(hour, value));
    onValueChange(changeHours(hour, value));
  };

  const onChangeMinutes = (minutes: number) => {
    onCalendarDateChange(changeMinutes(minutes, value));
    onValueChange(changeMinutes(minutes, value));
  };

  const onChangeSeconds = (seconds: number) => {
    onCalendarDateChange(changeSeconds(seconds, value));
    onValueChange(changeSeconds(seconds, value));
  };

  const onChangeMilliseconds = (milliseconds: number) => {
    onCalendarDateChange(changeMilliseconds(milliseconds, value));
    onValueChange(changeMilliseconds(milliseconds, value));
  };

  const now = new Date();
  const years = arrayRange(1900, 2099, 1);
  const hours = arrayRange(0, 23, 1);
  const minutes = arrayRange(0, 59, 1);

  const getActiveRowByYear = (year: number, yearsArray: number[][]) => {
    return yearsArray.findIndex(subArray => subArray.includes(year));
  };

  const separateYears = (years: number[], size: number = 4): number[][] =>
    years.reduce((acc: number[][], curr, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }
      acc[chunkIndex].push(curr);
      return acc;
    }, []);

  const contextValue: CalendarContextProps = {
    value,
    onCalendarDateChange,
    onValueChange,
    loading,
    calendarDate,
    separateYears,
    now,
    years,
    hours,
    minutes,
    getWeekDays,
    getActiveRowByYear,
    getWeeks,
    isCurrentCalendarDay,
    isCurrentDay,
    isDaySelected,
    isDiferentMonth,
    isCurrentCalendarMonth,
    isCurrentCalendarYear,
    isCurrentMonth,
    isCurrentYear,
    isMonthSelected,
    isYearSelected,
    getMonthData,
    changeYear,
    changeMonth,
    changeWeek,
    changeDay,
    changeHours,
    changeMinutes,
    changeSeconds,
    changeMilliseconds,
    onChangeHours,
    onChangeMinutes,
    onChangeDay,
    onChangeWeek,
    onChangeMonth,
    onChangeYear,
    onChangeSeconds,
    onChangeMilliseconds,
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
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);

  return context;
};
