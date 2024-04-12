import React, { TableHTMLAttributes, forwardRef } from 'react';
import { AriaCalendarGridProps, useLocale, useCalendarGrid } from 'react-aria';
import { getWeeksInMonth } from '@internationalized/date';
import { useCalendar } from '../../store';

type CalendarGridProps = AriaCalendarGridProps &
  TableHTMLAttributes<HTMLTableElement>;

const CalendarGrid = forwardRef<HTMLTableElement, CalendarGridProps>(
  ({ children, ...rest }, ref) => {
    const { state, setState } = useCalendar();
    let { locale } = useLocale();

    let { gridProps, ...restGridProps } = useCalendarGrid(rest, state.state);
    let weeksInMonth = getWeeksInMonth(state.state.visibleRange.start, locale);

    setState({ ...state, ...restGridProps, weeksInMonth });

    return (
      <table ref={ref} {...gridProps}>
        {children}
      </table>
    );
  }
);

const Grid = CalendarGrid;

export { CalendarGrid, CalendarGridProps, Grid };
