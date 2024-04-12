import { ReactNode } from 'react';

export type OptionValue = string | number;

export type OptionType = {
  label: ReactNode;
  value: OptionValue;
  disabled?: boolean;
};
