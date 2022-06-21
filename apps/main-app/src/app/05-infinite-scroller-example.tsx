import React from 'react';
import { BigListScroller } from './BigListScroller';
import type { ListChildComponentProps } from 'react-window';
import styles from './app.module.css';

type Item = {
  id: number;
  name: string;
};

function getItemCount(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(300), 500);
  });
}

function loadItems(page: number, pageSize: number): Promise<Item[]> {
  const start = (page - 1) * pageSize;
  return new Promise((resolve, reject) => {
    setTimeout(
      () =>
        resolve(
          Array.from({ length: pageSize }).map((_, idx) => ({
            id: start + idx + 1,
            name: `name ${start + idx + 1}`,
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
  const [itemCount, setItemCount] = React.useState(1);
  const items = React.useRef([] as Item[]);
  const listRef = React.useRef<any>();

  const itemsLen = items.current.length;
  React.useEffect(() => {
    const countReq = getItemCount();
    countReq.then((res) => {
      setItemCount(Math.min(itemsLen + pageSize, res));
    });
  }, [itemsLen]);
  const listHeight = itemCount * rowItemHeight + 100;

  console.log(
    '>>> item count:',
    itemCount,
    ', is loading:',
    loading,
    listHeight
  );
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
            height={listHeight}
            memonized
            threshold={itemCount}
          >
            {renderRow}
          </BigListScroller>
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
}

export default InfiniteScrollerExample;
