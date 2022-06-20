/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { 
  ComponentProps, ComponentType,ForwardedRef,memo, useEffect, useRef 
} from 'react';
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

const useForwardedRef = <T,>(ref: ForwardedRef<T>) => {
  const innerRef = useRef<T>(null);

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
}

const _BigListInfinite: React.ForwardRefRenderFunction<any, BigListInfiniteProps<any>> = ({
  isItemLoaded,
  loadMoreItems,
  threshold,
  minimumBatchSize,
  memonized,
  children,
  itemCount,
  ...props
}, ref) => {
  const rowMemonized = useRef(children);

  // memonize
  useEffect(() => {
    if (memonized)
      rowMemonized.current = memonizedRow(children);
  }, [memonized, children]);

  return (
    <AutoSize>
    {({ height, width }) => ( 
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
      {({ onItemsRendered, ref: setRef }) => (
        <List 
          ref={(node) => { 
            if (node) {
              setRef(node);
              if(typeof ref === 'function') ref(node);
              else if (ref) ref.current = node;
              console.log('>>>>>BigListInfinite: setref', typeof ref);
            }
          }}
          itemCount={itemCount} 
          onItemsRendered={onItemsRendered}
          width={width}
          height={height}
          {...props}
        >
          {rowMemonized.current}
        </List>
      )}
      </InfiniteLoader>
    )}
    </AutoSize>
  );
}

export const BigListInfinite = React.forwardRef(_BigListInfinite);
