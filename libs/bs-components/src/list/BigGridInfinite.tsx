/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  ComponentProps,
  memo,
  useEffect,
  useRef,
} from 'react';
import { areEqual, FixedSizeGrid as Grid, GridOnItemsRenderedProps, ListOnItemsRenderedProps, ListOnScrollProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSize from 'react-virtualized-auto-sizer';
import throttle from 'lodash/throttle';

interface BigGridInfiniteProps
  extends Omit<ComponentProps<typeof Grid>, 'width' | 'height' | 'columnWidth'> {
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

const _BigGridInfinite: React.ForwardRefRenderFunction<
  any,
  BigGridInfiniteProps
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
  const _columnCount = props.columnCount;
  return (
    <AutoSize>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={props.rowCount * props.columnCount}
          loadMoreItems={loadMoreItems}
          threshold={threshold}
          minimumBatchSize={minimumBatchSize}
        >
          {({ onItemsRendered, ref: setRef }) => (
            <Grid
              {...props}
              ref={(node) => {
                if (node) {
                  setRef(node);
                  if (typeof _ref === 'function') _ref(node);
                  else if (_ref) _ref.current = node;
                  //console.log('>>>>>BigListInfinite: setref', typeof ref);
                }
              }}
              columnWidth={width / props.columnCount}
              onItemsRendered={(p) => onItemsRendered({
                overscanStartIndex: p.overscanRowStartIndex * _columnCount + p.overscanColumnStartIndex,
                overscanStopIndex: p.overscanRowStopIndex * _columnCount + p.overscanColumnStopIndex,
                visibleStartIndex: p.visibleRowStartIndex * _columnCount + p.visibleColumnStartIndex,
                visibleStopIndex: p.visibleRowStopIndex * _columnCount + p.visibleColumnStopIndex,
              })}
              width={width}
              height={height}
              style={{ overflow: 'hidden' }}
            >
              {rowMemonized.current}
            </Grid>
          )}
        </InfiniteLoader>
      )}
    </AutoSize>
  );
};

export const BigGridInfinite = React.forwardRef(_BigGridInfinite);
