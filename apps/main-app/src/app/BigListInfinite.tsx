import React, { ComponentProps, ComponentType, memo, useEffect, useRef } from 'react';
import { areEqual, FixedSizeList as List } from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSize from 'react-virtualized-auto-sizer';

interface BigListInfiniteProps<T> extends Omit<ComponentProps<typeof List<T>>, 'width' | 'height'> {
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<void> | void;
  threshold?: number | undefined;
  minimumBatchSize?: number | undefined;
  memonized?: boolean;
  width?: number;
  height?: number;
}

export type RenderRow<T> = ComponentType<ListChildComponentProps<T>>;

const memonizedRow = (row: any) => memo(
  (props) => row(props),
  areEqual
);

const _BigList: React.ForwardRefRenderFunction<any, BigListInfiniteProps<any>> = ({
  isItemLoaded,
  loadMoreItems,
  threshold,
  minimumBatchSize,
  memonized,
  children,
  itemCount,
  ...props
}, ref) => {
  const row = useRef(children);
  useEffect(() => {
    if (memonized)
      row.current = memonizedRow(children);
  }, [memonized, children]);

  return (
    <InfiniteLoader
      ref={ref}
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSize>
          {({ height, width }) => (
            <List ref={ref} 
              itemCount={itemCount} 
              onItemsRendered={onItemsRendered}
              width={width}
              height={height}
              {...props}
            >
              {row.current}
            </List>
          )}
        </AutoSize>
      )}
    </InfiniteLoader>
  );
}

export const BigListInfinite = React.forwardRef(_BigList);
