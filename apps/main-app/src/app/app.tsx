/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Example } from './00-example';
import { SimpleExample } from './01-simple-example';
import { InfiniteAutoSizeExample } from './04-infinite-auto-size-example';
import { InfiniteGridExample } from './06-infinite-grid-example';
import { InfiniteScrollerExample } from './05-infinite-scroller-example';
import { UniPostsTopicsExample } from './10-uni-posts-topics-example';
import { UniPostsCommentsExample } from './11-uni-posts-comments-example';

let _page = 6;

const pages = [0, 1, 4, 5, 6, 10, 11];

export function App() {
  const [page, setPage] = React.useState(_page);
  _page = page;

  return (
    <>
    {
      pages.map((n)  => <span key={n}><a href='#' onClick={() => setPage(n)}>{n}</a> {' |'}</span>)
    }
      <p>Example: {page}</p>
      {page === 1 ? (
        <SimpleExample />
        ) : page === 11 ? (
          <UniPostsCommentsExample />
        ) : page === 10 ? (
          <UniPostsTopicsExample />
        ) : page === 0 ? (
          <Example />
        ) : page === 4 ? (
          <InfiniteAutoSizeExample />
        ) : page === 6 ? (
          <InfiniteGridExample />
        ) : page === 5 ? (
          <InfiniteScrollerExample />
        ) : (
          <p>No Example</p>
        )}
    </>
  );
}

export default App;
