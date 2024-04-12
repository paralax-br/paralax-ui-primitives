import React, { forwardRef, ReactNode } from 'react';
import { SwitchProvider, useSwitchContext } from './context';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  id?: string;
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    checked,
    onCheckedChange,
    defaultChecked,
    disabled,
    className,
    ...rest
  } = props;
  const [isChecked = false, setIsChecked] = useControllableState({
    prop: checked,
    defaultProp: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <SwitchProvider
      checked={isChecked}
      defaultChecked={defaultChecked}
      onCheckedChange={setIsChecked}
      disabled={disabled}
    >
      <button
        ref={ref}
        type="button"
        className={className}
        data-checked={isChecked}
        data-disabled={disabled}
        onClick={() => {
          setIsChecked(!isChecked);
          onCheckedChange?.(!isChecked);
        }}
        {...rest}
      />
    </SwitchProvider>
  );
});

interface SwitchThumbProps {
  className?: string;
}

const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(
  (props, ref) => {
    const { className } = props;
    const { checked, disabled } = useSwitchContext();

    return (
      <span
        ref={ref}
        data-checked={!!checked}
        data-disabled={!!disabled}
        className={className}
      />
    );
  }
);

export { Switch, SwitchProps, SwitchThumb, SwitchThumbProps };
