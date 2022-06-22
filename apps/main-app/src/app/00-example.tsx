import React, { useEffect, useState } from 'react';
import {
  useAppStore,
  resetApiStore,
  store,
} from '@howto/hydro-store';
import {
  hydroApi,
  useGetUniPostsCountQuery,  
} from '@howto/rtk-rest-api';

export function Example() {

  const [status, setStatus] = useState('');

  return (
    <>
    <p>Status: {status}</p>
    <p> Store Test</p>
      <button onClick={() => { getUniPosts(); }}>
        query
      </button>
      <button onClick={() => { 
        resetApiStore(); 
      }}>
        reset
      </button>
    </>
  );

  async function getUniPosts() {
    const { getUniPosts } = hydroApi.endpoints;
    const res = await store.dispatch(getUniPosts.initiate({ pagination: { limit: 1 }}));
    setStatus(res.status);
  }
}

export default Example;
