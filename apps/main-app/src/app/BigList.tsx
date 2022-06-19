import React, { ComponentProps, ComponentType, LegacyRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
 
interface BigListProps<T> extends ComponentProps<typeof List<T>> {
  type?: string;
}

export type RenderRow<T> = ComponentType<ListChildComponentProps<T>>;

const _BigList: React.ForwardRefRenderFunction<any, BigListProps<any>> = ({
  children,
  ...props
}, ref) => (
  <List ref={ref} {...props}>
    {children}
  </List>
);

export const BigList = React.forwardRef(_BigList);