import React from 'react';
import {
  BigListInfinite
} from '@howto/bs-components';
import { ListChildComponentProps } from 'react-window';

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
    setTimeout(() => resolve(
      Array.from({length: pageSize}).map((_, idx) => ({ id: start + idx + 1, name: `name ${start + idx + 1}` }))
    ), 500);
  });
}

const pageSize = 30;

export function App() {
  const [loading, setLoading] = React.useState(false);
  const [ itemCount, setItemCount ] = React.useState(1);
  const items = React.useRef([] as Item[]);
  const listRef = React.createRef<any>();

  const itemSize = items.current.length;
  React.useEffect(() => {
    const countReq = getItemCount();
    countReq.then((res) => {
      setItemCount(Math.min(itemSize + pageSize, res));
    });
  }, [itemSize]);

  console.log('>>> item count:', itemCount, ', is loading:', loading);
  return (
    <>
      <p> Vertical: </p>
      <BigListInfinite
        ref={listRef}
        height={150}
        itemSize={35}
        width={300}
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        itemCount={itemCount}
        memonized
      >
        {renderRow}
      </BigListInfinite>
    </>
  );

  function isItemLoaded(index: number): boolean {
    return index < items.current.length;
  }

  function loadMoreItems(startIndex: number, stopIndex: number) {
    console.log('>>> loadMoreItems():', startIndex, stopIndex);

    if (loading) return;
    setLoading(true);

    const promise = loadItems(
      Math.floor(stopIndex / pageSize) + 1,
      pageSize
    );
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
    return <div style={style}>Row {index}: {item.name}</div>
  }
}

export default App;
