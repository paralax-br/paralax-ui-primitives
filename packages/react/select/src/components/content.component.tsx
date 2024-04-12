import React from 'react';

import { Content, PopoverContentProps, Portal } from '@radix-ui/react-popover';
import { useSelectContext } from './root.component';

export type SelectContentProps = PopoverContentProps;

export const SelectContent = (props: SelectContentProps) => {
  const { children, onMouseLeave, ...rest } = props;

  const { setSelectedIndex, onKeyDown } = useSelectContext();

  if (typeof setSelectedIndex === 'undefined') {
    throw new Error('Select.ItemsList shound be used inside a Select');
  }

  return (
    <Portal>
      <Content
        {...rest}
        onMouseLeave={event => {
          setSelectedIndex(-1);
          onMouseLeave?.(event);
        }}
        onKeyDown={event => {
          onKeyDown?.(event);
          props?.onKeyDown?.(event);
        }}
      >
        {children}
      </Content>
    </Portal>
  );
};
