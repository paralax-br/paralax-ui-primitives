import React, { InputHTMLAttributes } from 'react';

import { useComboboxContext } from './root.component';

export type ComboboxSearchInputProps = InputHTMLAttributes<HTMLInputElement>;
export const ComboboxSearchInput = (props: ComboboxSearchInputProps) => {
  const { onChange, ...rest } = props;
  const { onKeyDown, setSelectedIndex, setSearchValue } = useComboboxContext();

  if (typeof onKeyDown === 'undefined') {
    throw new Error('Combobox.SearchInput shound be used inside a Combobox');
  }

  return (
    <input
      {...rest}
      onKeyDown={e => {
        props?.onKeyDown?.(e);
        onKeyDown?.(e);
      }}
      onChange={e => {
        onChange?.(e);
        setSearchValue(e.target.value);
        setSelectedIndex(-1);
      }}
    />
  );
};
