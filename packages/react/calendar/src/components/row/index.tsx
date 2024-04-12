import React, { HTMLAttributes, forwardRef } from 'react';

type CalendarRowProps = HTMLAttributes<HTMLTableRowElement>;

const CalendarRow = forwardRef<HTMLTableRowElement, CalendarRowProps>(
  ({ children, ...rest }, ref) => {
    return (
      <tr ref={ref} {...rest}>
        {children}
      </tr>
    );
  }
);

const Row = CalendarRow;

export { CalendarRow, CalendarRowProps, Row };
