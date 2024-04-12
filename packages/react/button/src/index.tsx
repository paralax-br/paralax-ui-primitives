import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react';
import { ButtonProvider, useButtonContext } from './context';
import { Slot } from '@radix-ui/react-slot';

type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type DefaultSpanProps = HTMLAttributes<HTMLSpanElement>;

interface ButtonProps extends DefaultButtonProps {
  asChild?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, loading, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <ButtonProvider loading={loading} {...rest}>
        <Comp {...rest} ref={ref} />
      </ButtonProvider>
    );
  }
);
Button.displayName = 'Button';

interface ButtonLoaderProps extends DefaultSpanProps {
  children?: ReactNode;
  asChild?: boolean;
}

const ButtonLoader = forwardRef<HTMLSpanElement, ButtonLoaderProps>(
  (props, ref) => {
    const { asChild, ...rest } = props;
    const { loading } = useButtonContext();
    const Comp = asChild ? Slot : 'span';

    return <Comp ref={ref} data-loading={String(loading)} {...rest} />;
  }
);
Button.displayName = 'ButtonLoader';

interface ButtonContentProps extends DefaultSpanProps {
  children?: ReactNode;
  asChild?: boolean;
}

const ButtonContent = forwardRef<HTMLSpanElement, ButtonContentProps>(
  (props, ref) => {
    const { asChild, ...rest } = props;
    const { loading, disabled } = useButtonContext();
    const Comp = asChild ? Slot : 'span';

    return (
      <Comp
        ref={ref}
        data-loading={loading}
        data-disabled={disabled}
        {...rest}
      />
    );
  }
);
Button.displayName = 'ButtonContent';

const Root = Button;
  const Loader = ButtonLoader;
  const Content = ButtonContent;

export {
  Button,
  ButtonLoader,
  ButtonContent,
};

export {
  Root,
  Loader,
  Content,
};

export type {
  ButtonProps,
  ButtonLoaderProps,
  ButtonContentProps,
};
