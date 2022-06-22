import React from 'react';
import {
  resetApiStore,
} from '@howto/hydro-store';
import {
  UniPostsTopics
} from '@howto/bs-components';

export function UniPostsTopicsExample() {

  return (
    <>
      <button onClick={() => resetApiStore()}> Reset </button>
      <UniPostsTopics categoryId={1}/>
    </>
  );
}

export default UniPostsTopicsExample;
