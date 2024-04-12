import { DOMAttributes } from 'react';
import { FocusableElement } from '@react-types/shared';
import { AriaButtonProps } from 'react-aria';
import { CalendarState } from 'react-stately';
import { create } from 'zustand';

type UseCalendarState = {
  title: string;
  prevButtonProps: AriaButtonProps<'button'>;
  nextButtonProps: AriaButtonProps<'button'>;
  errorMessageProps: DOMAttributes<FocusableElement>;
  state: CalendarState;
  buttonProps: DOMAttributes<FocusableElement>;
  formattedDate: string;
  isUnavailable: boolean;
  isDisabled: boolean;
  isOutsideVisibleRange: boolean;
  isSelected: boolean;
  weekDays: string[];
  headerProps: DOMAttributes<FocusableElement>;
  weeksInMonth: number;
};

type UseCalendar = {
  state: UseCalendarState;
  setState: (ctx: UseCalendarState) => void;
};

export const useCalendar = create<UseCalendar>()(set => ({
  state: {
    errorMessageProps: {},
    nextButtonProps: {},
    state: {} as CalendarState,
    prevButtonProps: {},
    title: '',
    buttonProps: {},
    formattedDate: '',
    isDisabled: false,
    isOutsideVisibleRange: false,
    isSelected: false,
    isUnavailable: false,
    headerProps: {},
    weekDays: [],
    weeksInMonth: 0,
  },
  setState: value => set((state: UseCalendar) => ({ ...value, ...state })),
}));
