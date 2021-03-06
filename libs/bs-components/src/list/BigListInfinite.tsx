/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  ComponentProps,
  memo,
  useEffect,
  useRef,
} from 'react';
import { areEqual, FixedSizeList as List, ListOnScrollProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSize from 'react-virtualized-auto-sizer';
import throttle from 'lodash/throttle';

interface BigListInfiniteProps
  extends Omit<ComponentProps<typeof List>, 'width' | 'height'> {
  memonized?: boolean;
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (
    startIndex: number,
    stopIndex: number
  ) => Promise<void> | void;
  threshold?: number | undefined;
  minimumBatchSize?: number | undefined;
  width?: number;
  height?: number;
}

const memonizedRow = (row: any) => memo((props) => row(props), areEqual);

const _BigListInfinite: React.ForwardRefRenderFunction<
  any,
  BigListInfiniteProps
> = (
  {
    children,
    memonized,
    isItemLoaded,
    loadMoreItems,
    threshold,
    minimumBatchSize,
    ...props
  },
  _ref
) => {
  const rowMemonized = useRef(children);

  // memonize
  useEffect(() => {
    if (memonized) rowMemonized.current = memonizedRow(children);
  }, [memonized, children]);

  return (
    <AutoSize>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={props.itemCount}
          loadMoreItems={loadMoreItems}
          threshold={threshold}
          minimumBatchSize={minimumBatchSize}
        >
          {({ onItemsRendered, ref: setRef }) => (
            <List
              {...props}
              ref={(node) => {
                if (node) {
                  setRef(node);
                  if (typeof _ref === 'function') _ref(node);
                  else if (_ref) _ref.current = node;
                  //console.log('>>>>>BigListInfinite: setref', typeof ref);
                }
              }}
              onItemsRendered={onItemsRendered}
              width={width}
              height={height}
              style={{ overflow: 'hidden' }}
            >
              {rowMemonized.current}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSize>
  );
};

export const BigListInfinite = React.forwardRef(_BigListInfinite);
