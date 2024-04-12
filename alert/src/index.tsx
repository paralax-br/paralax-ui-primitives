import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { ParagraphHTMLTag, HeadingHTMLTag } from './types';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ asChild, ...rest }, ref) => {
    const Comp = asChild ? Slot : 'div';

    return <Comp ref={ref} role="alert" {...rest} />;
  }
);

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  htmlTag?: HeadingHTMLTag;
  asChild?: boolean;
}

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ htmlTag, asChild, ...rest }, ref) => {
    const Tag = htmlTag ?? 'h4';
    const Comp = asChild ? Slot : Tag;

    return <Comp ref={ref} {...rest} />;
  }
);

interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
  htmlTag?: ParagraphHTMLTag;
}

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ asChild, htmlTag, ...props }, ref) => {
  const Tag = htmlTag ?? 'p';
  const Comp = asChild ? Slot : Tag;

  return <Comp ref={ref} {...props} />;
});

const Root = Alert;
const Title = AlertTitle;
const Description = AlertDescription;

export { Alert, AlertTitle, AlertDescription, Root, Title, Description };
export type { AlertProps, AlertTitleProps, AlertDescriptionProps }
