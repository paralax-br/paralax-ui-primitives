import {
  ComboboxContent,
  ComboboxCancel,
  ComboboxIcon,
  ComboboxItemIndicator,
  ComboboxItemLabel,
  ComboboxItemsList,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxSearchInput,
  ComboboxItem,
} from './components';

import type {
  ComboboxContentProps,
  ComboboxCancelProps,
  ComboboxIconProps,
  ComboboxItemIndicatorProps,
  ComboboxItemLabelProps,
  ComboboxItemsListProps,
  ComboboxRootProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
  ComboboxSearchInputProps,
  ComboboxItemProps,
} from './components';

const ComboboxNamespace = Object.assign(ComboboxRoot, {
  Item: ComboboxItem,
  ItemLabel: ComboboxItemLabel,
  Value: ComboboxValue,
  SearchInput: ComboboxSearchInput,
  Trigger: ComboboxTrigger,
  ItemsList: ComboboxItemsList,
  ItemIndicator: ComboboxItemIndicator,
  Icon: ComboboxIcon,
  Cancel: ComboboxCancel,
  Content: ComboboxContent,
});

export {
  ComboboxNamespace as Combobox,
  ComboboxItem as Item,
  ComboboxItemLabel as ItemLabel,
  ComboboxValue as Value,
  ComboboxSearchInput as SearchInput,
  ComboboxTrigger as Trigger,
  ComboboxItemsList as ItemsList,
  ComboboxItemIndicator as ItemIndicator,
  ComboboxIcon as Icon,
  ComboboxCancel as Cancel,
  ComboboxContent as Content,
};

export {
  ComboboxContentProps,
  ComboboxCancelProps,
  ComboboxIconProps,
  ComboboxItemIndicatorProps,
  ComboboxItemLabelProps,
  ComboboxItemsListProps,
  ComboboxRootProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
  ComboboxSearchInputProps,
  ComboboxItemProps,
  ComboboxRootProps as ComboboxProps,
  ComboboxContentProps as ContentProps,
  ComboboxCancelProps as CancelProps,
  ComboboxIconProps as IconProps,
  ComboboxItemIndicatorProps as ItemIndicatorProps,
  ComboboxItemLabelProps as ItemLabelProps,
  ComboboxItemsListProps as ItemsListProps,
  ComboboxRootProps as RootProps,
  ComboboxTriggerProps as TriggerProps,
  ComboboxValueProps as ValueProps,
  ComboboxSearchInputProps as SearchInputProps,
  ComboboxItemProps as ItemProps,
}

export * from './types'
