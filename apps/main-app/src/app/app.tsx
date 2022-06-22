import React from 'react';
import { Example } from './00-example';
import { SimpleExample } from './01-simple-example';
import { InfiniteAutoSizeExample } from './04-infinite-auto-size-example';
import { InfiniteScrollerExample } from './05-infinite-scroller-example';

let exampleId = 0;
export function App() {
  exampleId = 0;
  return (
    <>
      <p>Example: {exampleId}</p>
      {exampleId === 1 ? (
        <SimpleExample />
        ) : exampleId === 0 ? (
          <Example />
        ) : exampleId === 4 ? (
          <InfiniteAutoSizeExample />
        ) : exampleId === 5 ? (
          <InfiniteScrollerExample />
        ) : (
          <p>No Example</p>
        )}
    </>
  );
}

export default App;
