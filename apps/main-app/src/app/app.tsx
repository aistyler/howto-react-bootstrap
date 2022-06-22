import React from 'react';
import { Example } from './00-example';
import { SimpleExample } from './01-simple-example';
import { InfiniteAutoSizeExample } from './04-infinite-auto-size-example';
import { InfiniteScrollerExample } from './05-infinite-scroller-example';
import { UniPostsTopicsExample } from './10-uni-posts-topics-example';
import { UniPostsCommentsExample } from './11-uni-posts-comments-example';
let exampleId = 0;
export function App() {
  exampleId = 11;
  return (
    <>
      <p>Example: {exampleId}</p>
      {exampleId === 1 ? (
        <SimpleExample />
        ) : exampleId === 11 ? (
          <UniPostsCommentsExample />
        ) : exampleId === 10 ? (
          <UniPostsTopicsExample />
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
