import React, { HTMLAttributes, useEffect } from 'react';

import { getChildrenInnerText } from '../utils';

import { useItemContext } from './item.component';
import { useComboboxContext } from './root.component';

export type ComboboxItemLabelProps = HTMLAttributes<HTMLSpanElement>;

export const ComboboxItemLabel = (props: ComboboxItemLabelProps) => {
  const { children, onClick, onMouseEnter, ...rest } = props;

  const comboboxContext = useComboboxContext();

  if (!comboboxContext) {
    throw new Error('Combobox.ItemLabel shound be used inside a Combobox');
  }

  const itemContext = useItemContext();
  const { innerText, value, setInnerText, optionIndex } = itemContext || {};

  if (!itemContext) {
    throw new Error('Combobox.ItemLabel shound be used inside a Combobox.Item');
  }

  const childrenInnerText = getChildrenInnerText(children);

  useEffect(() => {
    setInnerText?.(childrenInnerText);
  }, [childrenInnerText, setInnerText]);

  return (
    <span
      {...rest}
      data-value={value}
      data-checked={comboboxContext?.value?.value === value}
      data-highlighted={optionIndex === comboboxContext?.selectedIndex}
      data-inner-text={innerText}
    >
      {children}
    </span>
  );
};
