import React, { HTMLAttributes, useEffect } from 'react';

import { getChildrenInnerText } from '../utils';

import { useItemContext } from './item.component';
import { useSelectContext } from './root.component';

export type SelectItemLabelProps = HTMLAttributes<HTMLSpanElement>;

export const SelectItemLabel = (props: SelectItemLabelProps) => {
  const { children, onClick, onMouseEnter, ...rest } = props;

  const selectContext = useSelectContext();

  if (!selectContext) {
    throw new Error('Select.ItemLabel shound be used inside a Select');
  }

  const itemContext = useItemContext();
  const { innerText, value, setInnerText, optionIndex } = itemContext || {};

  if (!itemContext) {
    throw new Error('Select.ItemLabel shound be used inside a Select.Item');
  }

  const childrenInnerText = getChildrenInnerText(children);

  useEffect(() => {
    setInnerText?.(childrenInnerText);
  }, [childrenInnerText, setInnerText]);

  return (
    <span
      {...rest}
      data-value={value}
      data-checked={selectContext?.value?.value === value}
      data-highlighted={optionIndex === selectContext?.selectedIndex}
      data-inner-text={innerText}
    >
      {children}
    </span>
  );
};
