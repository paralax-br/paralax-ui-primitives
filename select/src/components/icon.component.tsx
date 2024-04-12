import React, { HTMLAttributes } from 'react';

import { useSelectContext } from './root.component';

export type SelectIconProps = HTMLAttributes<HTMLSpanElement>;
export const SelectIcon = (props: SelectIconProps) => {
  const { children, onClick, ...rest } = props;
  const { isOpen } = useSelectContext();

  if (typeof isOpen === 'undefined') {
    throw new Error('Select.Icon shound be used inside a Select');
  }

  return (
    <span {...rest} data-open={isOpen}>
      {children}
    </span>
  );
};
