import React, { HTMLAttributes } from 'react';

import { useComboboxContext } from './root.component';

export type ComboboxIconProps = HTMLAttributes<HTMLSpanElement>;
export const ComboboxIcon = (props: ComboboxIconProps) => {
  const { children, onClick, ...rest } = props;
  const { isOpen } = useComboboxContext();

  if (typeof isOpen === 'undefined') {
    throw new Error('Combobox.Icon shound be used inside a Combobox');
  }

  return (
    <span {...rest} data-open={isOpen}>
      {children}
    </span>
  );
};
