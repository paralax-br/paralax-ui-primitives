import {
  SelectContent,
  SelectCancel,
  SelectIcon,
  SelectItemIndicator,
  SelectItemLabel,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from './components';

import type {
  SelectContentProps,
  SelectCancelProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemLabelProps,
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectItemProps,
} from './components';

const SelectNamespace = Object.assign(SelectRoot, {
  Item: SelectItem,
  ItemLabel: SelectItemLabel,
  Value: SelectValue,
  Trigger: SelectTrigger,
  ItemIndicator: SelectItemIndicator,
  Icon: SelectIcon,
  Cancel: SelectCancel,
  Content: SelectContent,
});

export {
  SelectNamespace as Select,
  SelectItem as Item,
  SelectItemLabel as ItemLabel,
  SelectValue as Value,
  SelectTrigger as Trigger,
  SelectItemIndicator as ItemIndicator,
  SelectIcon as Icon,
  SelectCancel as Cancel,
  SelectContent as Content,
};

export {
  SelectContentProps,
  SelectCancelProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemLabelProps,
  SelectRootProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectItemProps,
  SelectRootProps as SelectProps,
  SelectContentProps as ContentProps,
  SelectCancelProps as CancelProps,
  SelectIconProps as IconProps,
  SelectItemIndicatorProps as ItemIndicatorProps,
  SelectItemLabelProps as ItemLabelProps,
  SelectRootProps as RootProps,
  SelectTriggerProps as TriggerProps,
  SelectValueProps as ValueProps,
  SelectItemProps as ItemProps,
}

export * from './types'
