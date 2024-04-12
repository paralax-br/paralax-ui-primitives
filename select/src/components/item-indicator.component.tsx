import React, { HTMLAttributes } from 'react';

import { useItemContext } from './item.component';
import { useSelectContext } from './root.component';

export type SelectItemIndicatorProps = HTMLAttributes<HTMLSpanElement>;

export const SelectItemIndicator = (props: SelectItemIndicatorProps) => {
  const { children, ...rest } = props;
  const { value } = useSelectContext();

  if (typeof value === 'undefined') {
    throw new Error('Select.ItemIndicator shound be used inside a Select');
  }

  const itemContext = useItemContext();

  if (typeof itemContext === 'undefined') {
    throw new Error('Select.ItemIndicator shound be used inside a Select.Item');
  }

  if (value?.value !== itemContext?.value) return;

  return <span {...rest}>{children}</span>;
};
