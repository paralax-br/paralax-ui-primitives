import React, { HTMLAttributes, forwardRef } from 'react';
import { useCalendar } from '../../store';

type CalendarHeaderProps = HTMLAttributes<HTMLTableSectionElement>;

const CalendarHeader = forwardRef<HTMLTableSectionElement, CalendarHeaderProps>(
  ({ children, ...rest }, ref) => {
    const {
      state: { headerProps },
    } = useCalendar();

    return (
      <thead ref={ref} {...rest} {...headerProps}>
        {children}
      </thead>
    );
  }
);

const Header = CalendarHeader;

export { CalendarHeader, CalendarHeaderProps, Header };
