import React from 'react';
import memoizeOne from 'memoize-one';
import {
  BigList, RenderRow
} from '@howto/bs-components';

type Item = {
  id: number;
  name: string;
};

type ItemData = {
  items: Item[];
};

const Row:RenderRow<ItemData> = ({ data, index, style }) => {
  const { items } = data;
  const item = items[index];
  return <div style={style}>Row {index}: {item.name}</div>
};

function loadItems(): Item[] {
  return Array.from({length: 100}).map((_, idx) => ({ id: idx + 1, name: `name ${idx + 1}` }));
}

const createMemonizedItem = memoizeOne((items: Item[]) => ({ items }));

export function MemonizedExample() {
  const [ itemCount, setItemCount ] = React.useState(0);
  const items = React.useRef([] as Item[]);
  const itemData = createMemonizedItem(items.current);
  const listRef = React.createRef<any>();

  React.useEffect(() => {
    items.current = loadItems();
    setItemCount(items.current.length);
  }, []);
  console.log('>>> item count:', itemCount);
  return (
    <>
      <button onClick={() => listRef.current.scrollToItem(50)}> scroll to</button>
      <p> Vertical: </p>
      <BigList
        ref={listRef}
        height={150}
        itemSize={35}
        width={300}
        itemCount={itemCount}
        itemData={itemData}
        memonized
      >
        {Row}
      </BigList>
    </>
  );
}

export default MemonizedExample;