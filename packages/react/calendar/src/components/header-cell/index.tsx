import React, { ThHTMLAttributes, forwardRef } from 'react';

type CalendarHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement>;

const CalendarHeaderCell = forwardRef<
  HTMLTableCellElement,
  CalendarHeaderCellProps
>(({ children, ...rest }, ref) => {
  return (
    <th ref={ref} {...rest}>
      {children}
    </th>
  );
});

const HeaderCell = CalendarHeaderCell;

export { CalendarHeaderCell, CalendarHeaderCellProps, HeaderCell };
