import React from 'react';

import { PopoverTriggerProps, Trigger } from '@radix-ui/react-popover';

import { useSelectContext } from './root.component';

export type SelectTriggerProps = PopoverTriggerProps;

export const SelectTrigger = (props: SelectTriggerProps) => {
  const { children, ...rest } = props;
  const { ariaAttributes } = useSelectContext();

  if (typeof ariaAttributes === 'undefined') {
    throw new Error('Select.Trigger shound be used inside a Select');
  }

  return (
    <Trigger {...ariaAttributes} {...rest} type="button">
      {children}
    </Trigger>
  );
};
