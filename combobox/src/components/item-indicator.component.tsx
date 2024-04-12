import React, { HTMLAttributes } from 'react';

import { useItemContext } from './item.component';
import { useComboboxContext } from './root.component';

export type ComboboxItemIndicatorProps = HTMLAttributes<HTMLSpanElement>;

export const ComboboxItemIndicator = (props: ComboboxItemIndicatorProps) => {
  const { children, ...rest } = props;
  const { value } = useComboboxContext();

  if (typeof value === 'undefined') {
    throw new Error('Combobox.ItemIndicator shound be used inside a Combobox');
  }

  const itemContext = useItemContext();

  if (typeof itemContext === 'undefined') {
    throw new Error(
      'Combobox.ItemIndicator shound be used inside a Combobox.Item'
    );
  }

  if (value?.value !== itemContext?.value) return;

  return <span {...rest}>{children}</span>;
};
