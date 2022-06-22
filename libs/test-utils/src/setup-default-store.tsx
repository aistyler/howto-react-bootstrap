import React from 'react';
import { combineReducers, Store } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cleanup } from '@testing-library/react';

import {
  hydroApi,
  hydroApiReducers,
  hydroApiMiddlewares,
} from '@howto/rtk-rest-api';

function withProvider(store: Store<any>) {
  return function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  };
}

export function setupDefaultStore(withoutListeners?: boolean) {
  const getStore = () =>
    configureStore({
      reducer: combineReducers({ ...hydroApiReducers }),
      middleware: (gdm) =>
        gdm({
          serializableCheck: false,
          immutableCheck: false,
        }).concat(...hydroApiMiddlewares),
    });

  const initialStore = getStore();
  const refObj = {
    store: initialStore,
    wrapper: withProvider(initialStore),
  };
  let cleanupListeners: () => void;

  beforeEach(() => {
    const store = getStore();
    refObj.store = store;
    refObj.wrapper = withProvider(store);
    if (!withoutListeners) {
      cleanupListeners = setupListeners(store.dispatch);
    }
  });
  afterEach(() => {
    cleanup();
    if (!withoutListeners) {
      cleanupListeners();
    }
    refObj.store.dispatch(hydroApi.util.resetApiState());
  });

  return refObj;
}
