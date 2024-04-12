type Week = Date[];
type Month = Week[];

enum DayOfWeekFormatting {
  OneLetter = 'EEEEE',
  Compact = 'EEEEEE',
  BaseName = 'EEE',
  FullName = 'EEEE',
}

type WeekFormats = keyof typeof DayOfWeekFormatting;

enum MonthFormatting {
  OneLetter = 'MMMMM',
  Index = 'M',
  Order = 'Mo',
  FormatedIndex = 'MM',
  Compact = 'MMM',
  BaseName = 'MMM',
  FullName = 'MMMM',
}

type MonthFormats = keyof typeof MonthFormatting;

export type { Week, Month, WeekFormats, MonthFormats };

export { DayOfWeekFormatting, MonthFormatting };
