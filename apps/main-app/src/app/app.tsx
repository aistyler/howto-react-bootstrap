import React from 'react';
import { SimpleExample } from './01-simple-example';
import {InfiniteAutoSizeExample} from './04-infinite-auto-size-example';
import {InfiniteScrollerExample} from './05-infinite-scroller-example';

let exampleId = 1;
export function App() {
  return (
    <>
    <p>Example: {exampleId}</p>
    { 
      (exampleId === 1) ? <SimpleExample />
      : (exampleId === 4) ? <InfiniteAutoSizeExample />
      : (exampleId === 5) ? <InfiniteScrollerExample />
      : <p>No Example</p>
    }
    </>
  );
}

export default App;
