import React from 'react';
import {
  resetApiStore,
} from '@howto/hydro-store';
import {
  UniPostsComments
} from '@howto/bs-components';

export function UniPostsCommentsExample() {

  return (
    <>
      <button onClick={() => resetApiStore()}> Reset </button>
      <UniPostsComments topicId={1}/>
    </>
  );
}

export default UniPostsCommentsExample;
