import { renderHook, waitFor } from '@testing-library/react';
import {
  uniPostsAdapterSelector,
  uniPostsAdapterState,
  uniPostsSlice,
  UNI_POSTS_SLICE_KEY as SLICE_KEY,
} from './uni-posts.slice';
import {
  hydroPostApi as api,
  useGetUniPostsQuery,
} from '../api/hydro-post-api';
import {
  mswErrorHandlers,
  setupDefaultServer,
  setupApiStore,
} from '../../test/helpers';

//
// store
//
const refObj = setupApiStore<
  typeof api,
  { [SLICE_KEY]: typeof uniPostsSlice.reducer }
>(api, { [SLICE_KEY]: uniPostsSlice.reducer });

//
// server
//
const passthrough = false;
const server = setupDefaultServer(passthrough);

const { getUniPosts: findMany } = api.endpoints;

describe('# uni-posts slice basic', () => {
  let store: typeof refObj.store;

  beforeEach(() => {
    ({ store } = refObj);
  });

  it('should handle query', async () => {
    const selector = uniPostsAdapterSelector();

    //
    // before query, make sure entities is empty.
    let entities = selector.selectAll(store.getState());
    expect(entities).toEqual([]);

    //
    // start query
    const args = { pagination: { limit: 1 } };
    const promise = store.dispatch(findMany.initiate(args));
    //const { refetch, abort, arg, requestId  } = promise;

    //
    // wait query response
    const actionResult = await promise;

    //
    // check the response
    expect(actionResult.isSuccess).toBe(true);
    expect(actionResult.status).toBe('fulfilled');
    expect(actionResult.data?.data?.length).toBe(args.pagination.limit);

    entities = selector.selectAll(store.getState());
    expect(entities).toEqual(actionResult.data?.data);

    //
    // second request
    const args2 = { pagination: { start: 1, limit: 1 } };
    const actionResult2 = await store.dispatch(findMany.initiate(args2));
    expect(actionResult2.isSuccess).toBe(true);
    expect(actionResult2.data?.data?.length).toBe(args2.pagination.limit);

    const entities2 = selector.selectAll(store.getState());
    expect(entities2.length).toBe(
      args.pagination.limit + args2.pagination.limit
    );

    //
    // third request, duplicated items
    const args3 = { pagination: { start: 0, limit: 2 } };
    const actionResult3 = await store.dispatch(findMany.initiate(args3));
    expect(actionResult3.isSuccess).toBe(true);
    expect(actionResult3.data?.data?.length).toBe(args3.pagination.limit);

    const entities3 = selector.selectAll(store.getState());
    expect(entities3.length).toBe(
      args.pagination.limit + args2.pagination.limit
    );
  });

  it('should handle meta', async () => {
    const args = { pagination: { page: 1, pageSize: 10 } };
    const actionResult = await store.dispatch(findMany.initiate(args));
    const { pagination } = actionResult.data?.meta || {};
    expect(actionResult.isSuccess).toBe(true);
    expect(pagination).toBeDefined();

    const state = uniPostsAdapterState(store.getState());
    expect(state).toEqual({
      ...state,
      pageSize: pagination?.pageSize,
      pageCount: pagination?.pageCount,
      total: pagination?.total,
    });
  });

  it('should handle an error', async () => {
    // set server response to 400
    server.use(mswErrorHandlers.getUniPosts[0]);

    const args = { pagination: { limit: 1 } };
    const actionResult = await store.dispatch(findMany.initiate(args));
    expect(actionResult.isError).toBe(true);
  });
});

describe('# slice using hooks', () => {
  let store: typeof refObj.store;
  let wrapper: typeof refObj.wrapper;

  beforeEach(() => {
    ({ store, wrapper } = refObj);
  });

  it('should handle useGetQuery', async () => {
    const selector = uniPostsAdapterSelector();
    //
    // before query, make sure entities is empty.
    let entities = selector.selectIds(store.getState());
    expect(entities).toEqual([]);

    //
    // start query
    const arg = { pagination: { page: 1, pageSize: 2 } };
    const { result } = renderHook(
      () => useGetUniPostsQuery(arg),
      { wrapper }
    );

    expect(result.current.isLoading).toBe(true);

    //
    // wait query result
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 2000 });

    //
    // check the result
    const { data, isLoading, isSuccess } = result.current;
    expect(isLoading).toBe(false);
    expect(isSuccess).toBe(true);
    expect(data?.data?.length).toBe(arg.pagination.pageSize);

    entities = selector.selectIds(store.getState());
    expect(entities).toEqual(data?.data?.map((e) => e.id).sort((e1, e2) => (e2 as number) - (e1 as number)));
  });
});
