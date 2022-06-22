import React, {
  ComponentProps,
  ComponentType,
  memo,
  useEffect,
  useRef,
} from 'react';
import { areEqual, FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';

interface BigListProps extends ComponentProps<typeof List<any>> {
  memonized?: boolean;
}

export type RenderRow<T> = ComponentType<ListChildComponentProps<T>>;

const memonizedRow = (row: any) => memo((props) => row(props), areEqual);

const _BigList: React.ForwardRefRenderFunction<any, BigListProps> = (
  { children, memonized, ...props },
  ref
) => {
  const row = useRef(children);
  useEffect(() => {
    if (memonized) row.current = memonizedRow(children);
  }, [memonized, children]);

  return (
    <List ref={ref} {...props}>
      {row.current}
    </List>
  );
};

export const BigList = React.forwardRef(_BigList);
