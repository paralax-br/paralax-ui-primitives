import React, {
  createContext,
  Dispatch,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Popover, PopoverProps } from '@radix-ui/react-popover';

import { OptionType, OptionValue } from '../types';
import { getOptionValue } from '../utils';

type SelectContextProps = {
  isOpen: boolean;
  onIsOpen: (val: boolean) => void;
  value: OptionType | null;
  onValueChange: (val: OptionType | null) => void;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ariaAttributes: Record<string, string>;
  innerOptions: OptionType[];
  setInnerOptions: Dispatch<SetStateAction<OptionType[]>>;
};

const SelectContext = createContext<SelectContextProps>(
  {} as SelectContextProps
);

export type SelectRootProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value'
> &
  PopoverProps & {
    children?: ReactNode;
    value?: OptionValue;
    defaultValue?: OptionValue;
    onValueChange?: (value: OptionValue) => void;
  };

export const SelectRoot = forwardRef<HTMLInputElement, SelectRootProps>(
  (props, ref) => {
    const {
      children,
      onValueChange,
      onChange,
      onFocus,
      value,
      open,
      defaultValue,
      onOpenChange,
      ...rest
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [innerOptions, setInnerOptions] = useState<OptionType[]>([]);
    const [selectedItem, setSelectedItem] = useState<OptionType | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);

    const iOpenningControlled = typeof open !== 'undefined';
    const openValue: boolean = iOpenningControlled ? !!open : isOpen;
    const isControlled = typeof value !== 'undefined';

    const valueOption: OptionType =
      isControlled && typeof getOptionValue(value, innerOptions) !== 'undefined'
        ? getOptionValue(value, innerOptions)
        : ({} as OptionType);

    const selectValue = isControlled ? valueOption : selectedItem;

    const ariaAttributes = {
      role: 'select',
      'aria-expanded': isOpen ? 'open' : 'closed',
    };

    const handleValueChange = (opt: OptionType | null) => {
      setSelectedItem(opt);
      setIsOpen(false);

      if (!opt) {
        onValueChange?.('');
      } else {
        onValueChange?.(opt?.value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter' || 'Space':
          e.preventDefault();
          if (selectedIndex < 0 && !selectValue) {
            handleValueChange(null);
          }

          if (selectedIndex >= 0) {
            handleValueChange(innerOptions?.[selectedIndex] || null);
          }

          handleIsOpen(false);

          return;
        case 'ArrowDown':
          e.preventDefault();

          setSelectedIndex(state => {
            const nextIndex = state + 1;

            if (nextIndex >= innerOptions.length) {
              return 0;
            }

            return nextIndex;
          });

          return;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(state => {
            const prevIndex = state - 1;

            if (prevIndex < 0) {
              return innerOptions.length - 1;
            }
            return prevIndex;
          });
          return;
        default:
          return;
      }
    };

    const handleIsOpen = (val: boolean) => {
      if (iOpenningControlled) {
        onOpenChange?.(val);
      } else {
        setIsOpen(val);
      }
    };

    useEffect(() => {
      if (typeof defaultValue !== 'undefined') {
        const defaultOptionValue = getOptionValue(defaultValue, []);

        if (typeof defaultOptionValue?.value !== 'undefined') {
          handleValueChange(defaultOptionValue);
        }
      }
    }, [defaultValue]);

    return (
      <SelectContext.Provider
        value={{
          isOpen: openValue,
          setSelectedIndex,
          selectedIndex,
          ariaAttributes,
          innerOptions,
          setInnerOptions,
          value: selectValue,
          onIsOpen: handleIsOpen,
          onKeyDown: handleKeyDown,
          onValueChange: handleValueChange,
        }}
      >
        <Popover open={openValue} onOpenChange={handleIsOpen}>
          <div data-value={selectValue?.value} role="select-root">
            {children}

            <input
              {...rest}
              onChange={e => {
                onChange?.(e);

                const optionValue = getOptionValue(
                  e.target.value,
                  innerOptions
                );

                if (optionValue) {
                  handleValueChange(optionValue);
                }
              }}
              value={selectValue?.value}
              onFocus={e => {
                onFocus?.(e);
                setIsOpen(true);
              }}
              ref={ref}
              type="text"
              className="w-none h-none opacity-0 absolute"
            />
          </div>
        </Popover>
      </SelectContext.Provider>
    );
  }
);

export const useSelectContext = () => useContext(SelectContext);
