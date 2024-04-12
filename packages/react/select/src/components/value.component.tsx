import React from 'react';

import { useSelectContext } from './root.component';

export type SelectValueProps = {
  className?: string;
  placeholder?: string;
};

export const SelectValue = (props: SelectValueProps) => {
  const { className, placeholder } = props;
  const { value } = useSelectContext();

  if (typeof value === 'undefined') {
    throw new Error('Select.Value shound be used inside a Select');
  }

  return (
    <span className={className} data-value={!!value}>
      {value?.label || placeholder}
    </span>
  );
};
