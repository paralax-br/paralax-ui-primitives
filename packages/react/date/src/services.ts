import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { DayOfWeekFormatting, MonthFormats, Week, WeekFormats } from './types';
import { MonthFormatting } from './types';
import { Month } from './types';

const takeWeek = (start = new Date()) => {
  let date = startOfWeek(startOfDay(start));

  const weekGenerator = () => {
    const week: Week = [...Array(7)].map((_, i) => addDays(date, i));
    date = addDays(week[6], 1);
    return week;
  };

  return weekGenerator;
};


function lastDayOfRange(range: Month) {
  return range[range.length - 1][6];
}

const weekGenenerator = (date: Date) => takeWeek(startOfMonth(date));
const getEndDate = (date: Date) => startOfDay(endOfWeek(endOfMonth(date)));

interface TakeWeekDaysParams {
  locale?: Locale;
  weekFormat?: WeekFormats;
  currentDate?: Date;
}

const takeWeekDays = ({
  locale = ptBR,
  weekFormat = 'FullName',
  currentDate = new Date(),
}: TakeWeekDaysParams): string[] => {
  const weekDays: string[] = [];
  const start = startOfWeek(currentDate, { locale });
  const end = endOfWeek(currentDate, { locale });
  eachDayOfInterval({ start, end }).forEach((day) => {
    weekDays.push(format(day, DayOfWeekFormatting[weekFormat], { locale }));
  });
  return weekDays;
};

interface TakeMonthsNameParams {
  locale?: Locale;
  monthFormat?: MonthFormats;
  currentDate?: Date;
}

const takeMonthsName = ({
  locale = ptBR,
  monthFormat = 'FullName',
  currentDate = new Date(),
}: TakeMonthsNameParams): string[] => {
  const months: string[] = [];
  const start = startOfYear(currentDate);
  const end = endOfYear(currentDate);
  eachMonthOfInterval({ start, end }).forEach((day) => {
    months.push(format(day, MonthFormatting[monthFormat], { locale }));
  });
  return months;
};

const takeMonth = (start = new Date()) => {
  let month: Month = [];
  let date = start;

  const monthGenerator = () => {
    const weekGen = takeWeek(startOfMonth(date));
    const endDate = startOfDay(endOfWeek(endOfMonth(date)));
    month.push(weekGen());

    while (lastDayOfRange(month) < endDate) {
      month.push(weekGen());
    }

    const range = month;
    month = [];
    date = addDays(lastDayOfRange(range), 1);

    return range;
  };

  return monthGenerator;
};

export { takeMonth, takeWeek, weekGenenerator, getEndDate, takeWeekDays, takeMonthsName };
export type { TakeMonthsNameParams, TakeWeekDaysParams };
