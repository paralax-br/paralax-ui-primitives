import React, { HTMLAttributes } from 'react';

import { useSelectContext } from './root.component';

export type SelectCancelProps = HTMLAttributes<HTMLSpanElement>;
export const SelectCancel = (props: SelectCancelProps) => {
  const { children, onClick, ...rest } = props;
  const { onValueChange, onIsOpen } = useSelectContext();

  if (typeof onValueChange === 'undefined') {
    throw new Error('Select.Cancel shound be used inside a Select');
  }

  return (
    <span
      {...rest}
      onClick={e => {
        onValueChange(null);
        onIsOpen(false);
        onClick?.(e);
      }}
    >
      {children}
    </span>
  );
};
