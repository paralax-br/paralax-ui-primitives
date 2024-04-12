import { OptionType, OptionValue } from '../types';

export const getOptionValue = (
  val: OptionValue | undefined,
  options: OptionType[]
): OptionType => {
  if (typeof val === 'undefined') return {} as OptionType;

  return options?.find(opt => opt?.value === val) || ({} as OptionType);
};
