import React from 'react';
import {
  BigList, RenderRow
} from '@howto/bs-components';

const Row:RenderRow<any> = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

export function SimpleExample() {
  const listRef = React.createRef<any>();

  return (
    <>
    <button onClick={() => listRef.current.scrollToItem(500)}>scroll to row 500</button>
      <p> Vertical: </p>
      <BigList
        height={150}
        itemCount={1000}
        itemSize={35}
        width={300}
        ref={listRef}
      >
        {Row}
      </BigList>

      <p> Horizontal: </p>
      <BigList
        height={75}
        itemCount={1000}
        itemSize={100}
        width={300}
        layout="horizontal"
      >
        {Row}
      </BigList>
    </>
  );
}

export default SimpleExample;
