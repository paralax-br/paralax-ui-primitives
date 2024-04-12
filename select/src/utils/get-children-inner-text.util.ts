import React from 'react';

import { isReactElement } from './is-react-element.util';

export const getChildrenInnerText = (children: React.ReactNode) => {
  const childrenArray = React.Children.toArray(children);

  return childrenArray
    .map((child) => {
      if (typeof child === 'string') {
        return child; // If child is a string, return it as is
      } else if (isReactElement(child) && child.props.children) {
        return child.props.children; // If child is a ReactElement with children, return its children
      } else {
        return null; // Return null for other cases
      }
    })
    .filter(Boolean) // Filter out null values
    .join('');
};
