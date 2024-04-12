import React, { HTMLAttributes } from 'react';

import { useComboboxContext } from './root.component';

export type ComboboxItemsListProps = HTMLAttributes<HTMLDivElement>;
export const ComboboxItemsList = (props: ComboboxItemsListProps) => {
  const { children, onMouseLeave, ...rest } = props;
  const { setSelectedIndex } = useComboboxContext();

  if (typeof setSelectedIndex === 'undefined') {
    throw new Error('Combobox.ItemsList shound be used inside a Combobox');
  }

  return (
    <div
      {...rest}
      onMouseLeave={e => {
        setSelectedIndex(-1);
        onMouseLeave?.(e);
      }}
    >
      {children}
    </div>
  );
};
