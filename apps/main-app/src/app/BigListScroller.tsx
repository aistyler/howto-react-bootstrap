/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
  ComponentProps,
  ComponentType,
  ForwardedRef,
  memo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  areEqual,
  FixedSizeList as List,
  ListOnScrollProps,
} from 'react-window';
import type { ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSize from 'react-virtualized-auto-sizer';
import throttle from 'lodash/throttle';

interface BigListInfiniteProps
  extends Omit<ComponentProps<typeof List>, 'width' | 'height'> {
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (
    startIndex: number,
    stopIndex: number
  ) => Promise<void> | void;
  threshold?: number | undefined;
  minimumBatchSize?: number | undefined;
  memonized?: boolean;
  width?: number;
  height?: number;
  throttleTime?: number;
  isGrid?: boolean;
}

export type RenderRow<T> = ComponentType<ListChildComponentProps<T>>;

const memonizedRow = (row: any) => memo((props) => row(props), areEqual);

const windowScrollPositionKey = {
  y: 'pageYOffset' as const,
  x: 'pageXOffset' as const,
};

const documentScrollPositionKey = {
  y: 'scrollTop' as const,
  x: 'scrollLeft' as const,
};

const getScrollPosition = (axis: 'x' | 'y') =>
  window[windowScrollPositionKey[axis]] ||
  document.documentElement[documentScrollPositionKey[axis]] ||
  document.body[documentScrollPositionKey[axis]] ||
  0;

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
};

const _BigListScroller: React.ForwardRefRenderFunction<
  any,
  BigListInfiniteProps
> = (
  {
    isItemLoaded,
    loadMoreItems,
    threshold,
    minimumBatchSize,
    memonized,
    children,
    itemCount,
    throttleTime = 10,
    isGrid = false,
    ...props
  },
  ref
) => {
  const rowMemonized = useRef(children);
  const outerRef = useRef<HTMLDivElement>(null);
  const forwardedRef = useForwardedRef<HTMLDivElement>(ref);
  //const infiniteLoaderRef = useRef(null);

  // memonize
  useEffect(() => {
    if (memonized) rowMemonized.current = memonizedRow(children);
  }, [memonized, children]);

  // scroll
  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const ctrl = forwardedRef.current;
      if (ctrl) {
        const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {};
        const scrollTop = getScrollPosition('y') - offsetTop;
        if (isGrid) {
          const scrollLeft = getScrollPosition('x') - offsetLeft;
          ctrl.scrollTo({ left: scrollLeft, top: scrollTop });
        } else {
          ctrl.scrollTo(scrollTop, 0);
        }
        //console.log('>>> BigListScroller: scrollTop:', scrollTop);
      } else console.log('*** BigListScroller: ref is null');
    }, throttleTime);

    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      handleWindowScroll.cancel();
      window.removeEventListener('scroll', handleWindowScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGrid]);

  const onScroll = useCallback(
    ({ scrollOffset, scrollUpdateWasRequested }: ListOnScrollProps) => {
      if (!scrollUpdateWasRequested) return;
      const top = getScrollPosition('y');
      const left = getScrollPosition('x');
      const { offsetTop = 0, offsetLeft = 0 } = outerRef.current || {};

      scrollOffset += Math.min(top, offsetTop);
      const scrollTop = top + offsetTop;
      const scrollLeft = left + offsetLeft;

      if (!isGrid && scrollOffset !== top) window.scrollTo(0, scrollOffset);
      if (isGrid && (scrollTop !== top || scrollLeft !== left)) {
        window.scrollTo(scrollLeft, scrollTop);
      }
      console.log('>>> BigListScroller:onScroll() scrollTop:', scrollTop);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isGrid]
  );
  // @ts-ignore
  return (
    <AutoSize>
      {({ height, width }) => (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
          threshold={threshold}
          minimumBatchSize={minimumBatchSize}
        >
          {({ onItemsRendered, ref: setRef }) => (
            <List
              ref={(node) => {
                if (node) {
                  setRef(node);
                  // @ts-ignore
                  forwardedRef.current = node;
                  //console.log('>>>>>BigListScroller: setref', typeof ref);
                }
              }}
              outerRef={outerRef}
              itemCount={itemCount}
              onItemsRendered={onItemsRendered}
              width={width}
              height={props.height ?? height}
              onScroll={onScroll}
              {...props}
            >
              {rowMemonized.current}
            </List>
          )}
        </InfiniteLoader>
      )}
    </AutoSize>
  );
};

export const BigListScroller = React.forwardRef(_BigListScroller);
