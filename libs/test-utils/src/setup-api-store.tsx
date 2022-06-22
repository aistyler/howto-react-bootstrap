import React from 'react';
import {
  AnyAction,
  combineReducers,
  EnhancedStore,
  Middleware,
  Store,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { Reducer } from 'react';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cleanup } from '@testing-library/react';

function withProvider(store: Store<any>) {
  return function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  };
}

interface ApiType {
  reducerPath: 'hydroApi';
  reducer: Reducer<any, any>;
  middleware: Middleware;
  util: { resetApiState(): any };
}

export function setupApiStore<
  A extends ApiType,
  R extends Record<string, Reducer<any, any>> = Record<never, never>
>(api: A, extraReducers?: R, withoutListeners?: boolean) {
  const getStore = () =>
    configureStore({
      reducer: combineReducers({
        hydroApi: api.reducer,
        ...extraReducers,
      }),
      middleware: (gdm) =>
        gdm({ serializableCheck: false, immutableCheck: false }).concat(
          api.middleware
        ),
    });

  type StoreType = EnhancedStore<
    {
      hydroApi: ReturnType<A['reducer']>;
    } & {
      [K in keyof R]: ReturnType<R[K]>;
    },
    AnyAction,
    ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
      ? M
      : never
  >;

  const initialStore = getStore() as StoreType;
  const refObj = {
    api,
    store: initialStore,
    wrapper: withProvider(initialStore),
  };
  let cleanupListeners: () => void;

  beforeEach(() => {
    const store = getStore() as StoreType;
    refObj.store = store;
    refObj.wrapper = withProvider(store);
    if (!withoutListeners) {
      cleanupListeners = setupListeners(store.dispatch);
    }
    //console.log('>>>>>>>>>>>>>> Initial state.hydroApi', store.getState().hydroApi);
  });
  afterEach(() => {
    cleanup();
    if (!withoutListeners) {
      cleanupListeners();
    }
    refObj.store.dispatch(api.util.resetApiState());
  });

  return refObj;
}
