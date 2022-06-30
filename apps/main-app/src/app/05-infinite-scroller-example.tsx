import React from 'react';
import { BigListScroller } from './BigListScroller';
import type { ListChildComponentProps, ListOnItemsRenderedProps, ListOnScrollProps } from 'react-window';
import styles from './app.module.css';

type Item = {
  id: number;
  name: string;
};

const _totalCount = 121;
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

const pageSize = 30;
const rowItemHeight = 35;

export function InfiniteScrollerExample() {
  const [loading, setLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState<number>();
  const [itemCount, setItemCount] = React.useState(0);

  const items = React.useRef([] as Item[]);
  const listRef = React.useRef<any>();

  React.useEffect(() => {
    // start total count updater
    function _fetch() {
      const countReq = fetchTotalCount();
      countReq.then((res) => setTotalCount(res));
    }
    _fetch();
    const htimer = setInterval(_fetch, 5000);
    return () => {
      clearInterval(htimer);
    }
  }, []);

  const itemsLen = items.current.length;
  React.useEffect(() => {
    if (totalCount !== undefined)
      setItemCount(Math.min(itemsLen + pageSize, totalCount));
  }, [totalCount, itemsLen]);

  const listHeight = itemCount * rowItemHeight + 100;

  console.log('>>> item count:', itemCount, ', is loading:', loading);

  return (
    <div className={`container-fluid`}>
      <div className={`row`}>
        <p>Vertical:</p>
        <button onClick={() => listRef.current.scrollToItem(50)}>
          scroll to
        </button>
      </div>
      <div className={`row`} style={{ height: listHeight, overflow: 'hidden' }}>
        <div className={`col`} style={{ overflow: 'hidden' }}>
          <BigListScroller
            className={styles['list']}
            ref={listRef}
            itemSize={rowItemHeight}
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
            itemCount={itemCount}
            memonized
            threshold={itemCount}
          >
            {renderRow}
          </BigListScroller>
        </div>
      </div>
    </div>
  );

  function onScroll(props: ListOnScrollProps) {
    //console.log('>>> onScroll', props.scrollDirection, props.scrollOffset, props.scrollUpdateWasRequested);
  }

  function onItemsRendered(props: ListOnItemsRenderedProps) {
    console.log('>>> onItemsRendered', props);
  }

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
      setLoading(false);
    });
    return promise as any as Promise<void>;
  }

  function renderRow({ index, style }: ListChildComponentProps) {
    if (index >= items.current.length - 1) {
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
    const start = (page - 1) * pageSize;
    return fetchItems(start, pageSize);
  }
}

export default InfiniteScrollerExample;
