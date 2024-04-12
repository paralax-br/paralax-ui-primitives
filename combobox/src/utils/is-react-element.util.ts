import { ReactNode } from 'react';

export const isReactElement = (node: ReactNode): node is React.ReactElement => {
  if (!node) return false;
  return typeof node === 'object' && 'props' in node;
};
