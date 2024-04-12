import React, { HTMLAttributes } from 'react';

import { useComboboxContext } from './root.component';

export type ComboboxCancelProps = HTMLAttributes<HTMLSpanElement>;
export const ComboboxCancel = (props: ComboboxCancelProps) => {
  const { children, onClick, ...rest } = props;
  const { onValueChange, onIsOpen } = useComboboxContext();

  if (typeof onValueChange === 'undefined') {
    throw new Error('Combobox.Cancel shound be used inside a Combobox');
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
