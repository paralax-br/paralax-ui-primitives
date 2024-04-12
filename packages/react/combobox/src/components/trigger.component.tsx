import React from 'react';

import { PopoverTriggerProps, Trigger } from '@radix-ui/react-popover';

import { useComboboxContext } from './root.component';

export type ComboboxTriggerProps = PopoverTriggerProps;

export const ComboboxTrigger = (props: ComboboxTriggerProps) => {
  const { children, ...rest } = props;
  const { ariaAttributes } = useComboboxContext();

  if (typeof ariaAttributes === 'undefined') {
    throw new Error('Combobox.Trigger shound be used inside a Combobox');
  }

  return (
    <Trigger {...ariaAttributes} {...rest} type="button">
      {children}
    </Trigger>
  );
};
