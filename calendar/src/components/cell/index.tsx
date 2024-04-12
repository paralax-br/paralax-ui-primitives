import React, {
  TdHTMLAttributes,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { useCalendarCell, AriaCalendarCellProps } from 'react-aria';
import { useCalendar } from '../../store';

type CalendarCellProps = AriaCalendarCellProps &
  TdHTMLAttributes<HTMLTableCellElement>;

const CalendarCell = forwardRef<HTMLTableCellElement, CalendarCellProps>(
  ({ children, ...rest }, ref) => {
    const cellRef = useRef<HTMLTableCellElement>({} as HTMLTableCellElement);
    useImperativeHandle(ref, () => cellRef.current);
    const { state, setState } = useCalendar();

    const { cellProps, ...restCellProps } = useCalendarCell(
      rest,
      state.state,
      cellRef
    );

    setState({ ...state, ...restCellProps });

    return (
      <td ref={cellRef} {...cellProps}>
        {children}
      </td>
    );
  }
);

const Cell = CalendarCell;

export { CalendarCellProps, CalendarCell, Cell };
