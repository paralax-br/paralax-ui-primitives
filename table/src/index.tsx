import * as React from 'react';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>((props, ref) => (
  <div
    style={{
      width: '100%',
      overflow: 'auto',
    }}
  >
    <table ref={ref} {...props} />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <thead ref={ref} {...props} />);
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <tbody ref={ref} {...props} />);
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>((props, ref) => <tfoot ref={ref} {...props} />);
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => <tr ref={ref} {...props} />);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>((props, ref) => <th ref={ref} {...props} />);
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>((props, ref) => <td ref={ref} {...props} />);
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>((props, ref) => <caption ref={ref} {...props} />);
TableCaption.displayName = 'TableCaption';

const Root = Table;
const Header = TableHeader;
const Body = TableBody;
const Footer = TableFooter;
const Head = TableHead;
const Row = TableRow;
const Cell = TableCell;
const Caption = TableCaption;

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

export { Root, Header, Body, Footer, Head, Row, Cell, Caption };
