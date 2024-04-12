import * as React from 'react';
import { useComposedRefs } from '@radix-ui/react-compose-refs';
import { createContextScope } from '@radix-ui/react-context';
import { composeEventHandlers } from '@radix-ui/primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Presence } from '@radix-ui/react-presence';
import { Primitive } from '@radix-ui/react-primitive';

import type * as Radix from '@radix-ui/react-primitive';
import type { Scope } from '@radix-ui/react-context';

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/

const CHECKBOX_NAME = 'Checkbox';

type ScopedProps<P> = P & { __scopeCheckbox?: Scope };
const [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);

type CheckedState = boolean | 'indeterminate';

type CheckboxContextValue = {
  state: CheckedState;
  disabled?: boolean;
};

const [CheckboxProvider, useCheckboxContext] =
  createCheckboxContext<CheckboxContextValue>(CHECKBOX_NAME);

type CheckboxElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = Radix.ComponentPropsWithoutRef<typeof Primitive.button>;
interface CheckboxProps extends Omit<PrimitiveButtonProps, 'checked' | 'defaultChecked'> {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  required?: boolean;
  onCheckedChange?(checked: CheckedState): void;
}

const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(
  (props: ScopedProps<CheckboxProps>, forwardedRef) => {
    const {
      __scopeCheckbox,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = 'on',
      onCheckedChange,
      children,
      ...checkboxProps
    } = props;
    const [button, setButton] = React.useState<HTMLButtonElement | null>(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = React.useRef(false);
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = button ? Boolean(button.closest('form')) : true;
    const [checked = false, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });
    const initialCheckedStateRef = React.useRef(checked);
    React.useEffect(() => {
      const form = button?.form;
      if (form) {
        const reset = () => setChecked(initialCheckedStateRef.current);
        form.addEventListener('reset', reset);
        return () => form.removeEventListener('reset', reset);
      }
      return;
    }, [button, setChecked]);

    return (
      <CheckboxProvider scope={__scopeCheckbox} state={checked} disabled={disabled}>
        <Primitive.button
          type="button"
          role="checkbox"
          aria-checked={isIndeterminate(checked) ? 'mixed' : checked}
          aria-required={required}
          data-state={getState(checked)}
          data-disabled={disabled ? '' : undefined}
          disabled={disabled}
          value={value}
          {...checkboxProps}
          ref={composedRefs}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if (event.key === 'Enter') event.preventDefault();
          })}
          onClick={composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => (isIndeterminate(prevChecked) ? true : !prevChecked));
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })}
        >
          {children}
        </Primitive.button>
      </CheckboxProvider>
    );
  }
);

Checkbox.displayName = CHECKBOX_NAME;

/* -------------------------------------------------------------------------------------------------
 * CheckboxIndicator
 * -----------------------------------------------------------------------------------------------*/

const INDICATOR_NAME = 'CheckboxIndicator';

type CheckboxIndicatorElement = React.ElementRef<typeof Primitive.span>;
type PrimitiveSpanProps = Radix.ComponentPropsWithoutRef<typeof Primitive.span>;
interface CheckboxIndicatorProps extends PrimitiveSpanProps {
  forceMount?: true;
}

const CheckboxIndicator = React.forwardRef<CheckboxIndicatorElement, CheckboxIndicatorProps>(
  (props: ScopedProps<CheckboxIndicatorProps>, forwardedRef) => {
    const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
    const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
    return (
      <Presence present={forceMount || isIndeterminate(context.state) || context.state === true}>
        <Primitive.span
          data-state={getState(context.state)}
          data-disabled={context.disabled ? '' : undefined}
          {...indicatorProps}
          ref={forwardedRef}
        />
      </Presence>
    );
  }
);

CheckboxIndicator.displayName = INDICATOR_NAME;

function isIndeterminate(checked?: CheckedState): checked is 'indeterminate' {
  return checked === 'indeterminate';
}

function getState(checked: CheckedState) {
  return isIndeterminate(checked) ? 'indeterminate' : checked ? 'checked' : 'unchecked';
}

const Root = Checkbox;
const Indicator = CheckboxIndicator;

export {
  createCheckboxScope,
  Checkbox,
  CheckboxIndicator,
  Root,
  Indicator,
};
export type { CheckboxProps, CheckboxIndicatorProps };
