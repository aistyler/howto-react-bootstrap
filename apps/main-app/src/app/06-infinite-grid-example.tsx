import React from 'react';
import { BigGridInfinite } from '@howto/bs-components';
import { GridChildComponentProps, GridOnScrollProps, ListChildComponentProps, ListOnScrollProps } from 'react-window';
import throttle from 'lodash/throttle';
import styles from './app.module.css';

type Item = {
  id: number;
  name: string;
};

const _totalCount = 300;
const _fetchCount = 0;
function fetchTotalCount(): Promise<number> {
  //if (_fetchCount++ % 10) _totalCount += 5;

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(_totalCount), 500);
  });
}

function fetchItems(offsetIndex: number, length: number): Promise<Item[]> {
  if (offsetIndex + length > _totalCount) {
    length = _totalCount - offsetIndex;
    if (length < 0) length = 0;
  }
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve(
          Array.from({ length }).map((_, idx) => ({
            id: offsetIndex + idx + 1,
            name: `name ${offsetIndex + idx + 1}`,
          }))
        ),
      500
    );
  });
}

const windowScrollPositionKey = {
  y: 'pageYOffset' as const,
  x: 'pageXOffset' as const,
};

const documentScrollPositionKey = {
  y: 'scrollTop' as const,
  x: 'scrollLeft' as const,
};

const documentScrollHeightKey = {
  x: 'scrollWidth' as const,
  y: 'scrollHeight' as const,
};

const documentClientHeightKey = {
  x: 'clientWidth' as const,
  y: 'clientHeight' as const,
}

const getScrollPosition = (axis: 'x' | 'y') =>
  window[windowScrollPositionKey[axis]] ||
  document.documentElement[documentScrollPositionKey[axis]] ||
  document.body[documentScrollPositionKey[axis]] ||
  0;

const getScrollSize = (axis: 'x' | 'y') =>
document.documentElement[documentScrollHeightKey[axis]] ||
0;

const getClientSize = (axis: 'x' | 'y') =>
document.documentElement[documentClientHeightKey[axis]] ||
0;

const pageSize = 30;
const rowHeight = 35;
const throttleTime = 100;
const columnCount = 2;
const scrollThreshold = 0.9;

export function InfiniteGridExample() {
  const [loading, setLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState<number>();
  const [rowCount, setRowCount] = React.useState(0);
  const [ctrlHeight, setCtrlHeight] = React.useState(0);
  const items = React.useRef([] as Item[]);
  const listRef = React.useRef<any>();
  const outerRef = React.useRef<HTMLDivElement>();

  const itemsLen = items.current.length;

  React.useEffect(() => {
    function _fetch() {
      const countReq = fetchTotalCount();
      countReq.then((res) => setTotalCount(res));
    }
    _fetch();
    // start total count updater
    const htimer = setInterval(_fetch, 5000);

    const handleWindowScroll = throttle(() => {
      const totalHeight = Math.ceil((items.current.length/columnCount) * rowHeight + 10);
      const scrollTop = getScrollPosition('y');
      const clientHeight = getClientSize('y');
      const scrollBottom = scrollTop + clientHeight;

      if (totalHeight <= clientHeight ) return;

      if (scrollBottom / totalHeight > scrollThreshold) {
        console.log('>>> increase height:', scrollBottom / totalHeight);
        setCtrlHeight(Math.max(ctrlHeight, totalHeight));
      }
      //console.log('top:', scrollTop, ', bottom:', scrollBottom, ', scroll pos:', scrollBottom / totalHeight);
    }, throttleTime);

    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      clearInterval(htimer);
      handleWindowScroll.cancel();
      window.removeEventListener('scroll', handleWindowScroll);
    }
  }, []);

  React.useEffect(() => {
    if (totalCount !== undefined) {
      const _maxRowCount = Math.ceil(totalCount / columnCount);
      const _rowCount = Math.ceil((items.current.length+1) / columnCount);
      setRowCount(Math.min(_rowCount, _maxRowCount));

      const _maxRowHeight = _maxRowCount * rowHeight;
      const _rowHeight = _rowCount * rowHeight;
      const _thresholdHeight = Math.min(_rowHeight, _maxRowHeight) * scrollThreshold;
      setCtrlHeight((_rowHeight >= _maxRowHeight) ? _maxRowHeight : _thresholdHeight);
    }
  }, [totalCount, items.current.length]);

  console.log('>>> row count:', rowCount, ', ctrl height:', ctrlHeight, ', is loading:', loading);

  return (
    <div className={`container`}>
      <div className={'row'}>
        <div className={'col'}>
          <p> Vertical: </p>
        </div>
        <button onClick={() => listRef.current.scrollToItem(50)}>
          scroll to
        </button>
      </div>

      <div className={'row'} style={{ height: ctrlHeight, overflow: 'hidden' }}>
        <div className={'col'}>
          <BigGridInfinite
            className={styles['list']}
            ref={listRef}
            rowHeight={rowHeight}
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
            columnCount={columnCount}
            rowCount={rowCount}
            threshold={pageSize}
            memonized
          >
            {renderCell}
          </BigGridInfinite>
        </div>
      </div>
    </div>
  );

  function isItemLoaded(index: number): boolean {
    return index < items.current.length;
  }

  function loadMoreItems(startIndex: number, stopIndex: number) {
    console.log('>>> loadMoreItems():', startIndex, stopIndex);

    if (loading) return;
    setLoading(true);

    const promise = loadItems(Math.floor(stopIndex / pageSize) + 1, pageSize);
    promise.then((result) => {
      items.current.splice(items.current.length, 0, ...result);
      console.log('>>> loadMoreItems(): loaded items length:', items.current.length);
      setLoading(false);
    });
    return promise as any as Promise<void>;
  }

  function renderCell({ rowIndex, columnIndex, style }: GridChildComponentProps) {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= items.current.length) {
      console.log('*** OVERFLOWED INDEX:', index, items.current.length);
      return null;
    }
    const item = items.current[index];
    return (
      <div style={style}>
        Row {index}: {item.name}
      </div>
    );
  }

  function loadItems(page: number, pageSize: number): Promise<Item[]> {
    const startIdx = (page - 1) * pageSize;
    return fetchItems(startIdx, pageSize);
  }
}

export default InfiniteGridExample;
