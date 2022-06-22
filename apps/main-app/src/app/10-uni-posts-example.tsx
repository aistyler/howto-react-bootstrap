import React, { useEffect, useState } from 'react';
import {
  useAppStore,
  resetApiStore,
  store,
} from '@howto/hydro-store';
import {
  UniPostsList
} from '@howto/bs-components';

export function UniPostsExample() {

  return (
    <>
      <button onClick={() => resetApiStore()}> Reset </button>
      <UniPostsList categoryId={1}/>
    </>
  );
}

export default UniPostsExample;
