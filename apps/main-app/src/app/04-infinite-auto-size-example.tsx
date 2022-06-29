import React from 'react';
import { BigListInfinite } from '@howto/bs-components';
import { ListChildComponentProps } from 'react-window';
import styles from './app.module.css';

type Item = {
  id: number;
  name: string;
};

let _totalCount = 300;
let _fetchCount = 0;
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

export function InfiniteAutoSizeExample() {
  const [loading, setLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState<number>();
  const [itemCount, setItemCount] = React.useState(1);

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

  console.log('>>> item count:', itemCount, ', is loading:', loading);

  return (
    <div className={`container h-90`}>
      <div className={'row'}>
        <div className={'col'}>
          <p> Vertical: </p>
        </div>
        <button onClick={() => listRef.current.scrollToItem(50)}>
          scroll to
        </button>
      </div>

      <div className={'row h-50'}>
        <div className={'col'}>
          <BigListInfinite
            className={styles['list']}
            ref={listRef}
            itemSize={35}
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
            itemCount={itemCount}
            memonized
          >
            {renderRow}
          </BigListInfinite>
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

  function renderRow({ index, style }: ListChildComponentProps) {
    if (index >= items.current.length) {
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

export default InfiniteAutoSizeExample;
