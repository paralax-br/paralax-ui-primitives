import React from 'react';

import { useComboboxContext } from './root.component';

export type ComboboxValueProps = {
  className?: string;
  placeholder?: string;
};

export const ComboboxValue = (props: ComboboxValueProps) => {
  const { className, placeholder } = props;
  const { value } = useComboboxContext();

  if (typeof value === 'undefined') {
    throw new Error('Combobox.Value shound be used inside a Combobox');
  }

  return (
    <span className={className} data-value={!!value}>
      {value?.label || placeholder}
    </span>
  );
};
