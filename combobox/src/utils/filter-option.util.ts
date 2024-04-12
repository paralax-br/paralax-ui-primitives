import { normalizeString } from './normalize-string.util';

export const filterValues = (vals: string[], searchValue: string) => {
  return vals.some((val) => normalizeString(val).includes(normalizeString(searchValue)));
};
