import React from 'react';

import { Content, PopoverContentProps, Portal } from '@radix-ui/react-popover';

export type ComboboxContentProps = PopoverContentProps;

export const ComboboxContent = (props: ComboboxContentProps) => {
  return (
    <Portal>
      <Content
        {...props}
        onOpenAutoFocus={event => {
          if (props?.onOpenAutoFocus) {
            props?.onOpenAutoFocus(event);
            return;
          }

          event.preventDefault();
        }}
      >
        {props.children}
      </Content>
    </Portal>
  );
};
