import React, { HTMLAttributes, ReactNode } from 'react';
import {
  useCalendar as useCalendarPrimitive,
  useLocale,
  CalendarProps as CalendarPrimitiveProps,
} from 'react-aria';
import { useCalendarState } from 'react-stately';
import { createCalendar, DateValue } from '@internationalized/date';
import { forwardRef } from 'react';
import { useCalendar } from '../../store';

type CalendarDivProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
>;

interface CalendarProps<T extends DateValue>
  extends CalendarPrimitiveProps<T>,
    CalendarDivProps {
  children?: ReactNode;
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps<DateValue>>(
  ({ children, ...rest }, ref) => {
    const { locale } = useLocale();
    const calendarState = useCalendarState({
      ...rest,
      locale,
      createCalendar,
    });

    const { calendarProps, ...restCalendarProps } = useCalendarPrimitive(
      rest,
      calendarState
    );
    const { state, setState } = useCalendar();
    setState({ ...state, ...restCalendarProps, state: calendarState });

    return (
      <div ref={ref} {...calendarProps}>
        {children}
      </div>
    );
  }
);

const Root = Calendar;

export { Calendar, CalendarProps, Root };
