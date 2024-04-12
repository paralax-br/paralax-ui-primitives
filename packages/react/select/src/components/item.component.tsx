import React, {
  createContext,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { OptionType, OptionValue } from '../types';

import { useSelectContext } from './root.component';

type ItemContextProps = OptionType & {
  innerText: string;
  setInnerText: (value: string) => void;
  optionIndex: number;
};

const ItemContext = createContext<ItemContextProps>({} as ItemContextProps);

export type SelectItemProps = HTMLAttributes<HTMLDivElement> & {
  label?: ReactNode;
  value: OptionValue;
  disabled?: boolean;
};

export const SelectItem = (props: SelectItemProps) => {
  const { children, onClick, label, disabled, onMouseEnter, ...rest } = props;

  const [innerText, setInnerText] = useState('');

  const selectContext = useSelectContext();
  const {
    onValueChange,
    setInnerOptions,
    setSelectedIndex,
    value,
    selectedIndex,
    innerOptions,
  } = selectContext || {};

  const optionIndex = innerOptions?.findIndex(
    opt => opt?.value === props?.value
  );

  const optionValue = useMemo(
    () => ({ value: props?.value, label: label ?? children, disabled }),
    [label, props?.value, disabled, children]
  );

  useEffect(() => {
    setInnerOptions(state => {
      if (state?.find(opt => opt?.value === optionValue?.value)) {
        return state;
      }

      return [...state, optionValue];
    });
  }, [setInnerOptions, optionValue]);

  return (
    <ItemContext.Provider
      value={{
        label,
        value: props?.value,
        optionIndex,
        disabled,
        innerText,
        setInnerText,
      }}
    >
      <div
        {...rest}
        data-value={value}
        data-checked={value?.value === props?.value}
        data-highlighted={optionIndex === selectedIndex}
        onMouseEnter={e => {
          onMouseEnter?.(e);
          setSelectedIndex(optionIndex);
        }}
        onClick={e => {
          onValueChange(optionValue);
          onClick?.(e);
        }}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
