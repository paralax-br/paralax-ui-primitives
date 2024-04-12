import * as React from 'react';
import { BoxHTMLTag, ParagraphHTMLTag, HeadingHTMLTag } from './types';
import { Slot } from '@radix-ui/react-slot';

interface CardBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlTag?: BoxHTMLTag;
  asChild?: boolean;
}

const CardBox = React.forwardRef<HTMLDivElement, CardBoxProps>(
  (props, ref) => {
    const { htmlTag, asChild, ...rest } = props;

    const Tag = htmlTag ?? 'div';
    const Comp = asChild ? Slot : Tag;

    return <Comp ref={ref} {...rest} />;
  }
);

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlTag?: HeadingHTMLTag;
  asChild?: boolean;
}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  (props, ref) => {
    const { htmlTag, asChild, ...rest } = props;

    const Tag = htmlTag ?? 'h4';
    const Comp = asChild ? Slot : Tag;

    return <Comp ref={ref} {...rest} />;
  }
);

interface CardTextProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlTag?: ParagraphHTMLTag;
  asChild?: boolean;
}

const CardText = React.forwardRef<HTMLDivElement, CardTextProps>(
  (props, ref) => {
    const { htmlTag, asChild, ...rest } = props;

    const Tag = htmlTag ?? 'p';
    const Comp = asChild ? Slot : Tag;

    return <Comp ref={ref} {...rest} />;
  }
);


type CardProps = CardBoxProps;
const Card = CardBox;

type CardHeaderProps = CardBoxProps;
const CardHeader = CardBox;

type CardDescriptionProps = CardTextProps;
const CardDescription = CardText;

type CardContentProps = CardBoxProps;
const CardContent = CardBox;

type CardFooterProps = CardBoxProps;
const CardFooter = CardBox;

const Root = Card;
const Header = CardHeader;
const Footer = CardFooter;
const Title = CardTitle;
const Description = CardDescription;
const Content = CardContent;

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

export {
  Root,
  Header,
  Footer,
  Title,
  Description,
  Content,
};

export type {
  CardProps, CardHeaderProps, CardDescriptionProps, CardContentProps, CardFooterProps, CardTitleProps
};
