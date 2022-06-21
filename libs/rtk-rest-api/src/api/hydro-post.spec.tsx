import { renderHook, act, waitFor } from '@testing-library/react';
import { setupDefaultServer, setupApiStore } from '../../test/helpers';
import {
  hydroPostApi as api,
  useGetUniPostsQuery,
  useGetUniPostsByIdQuery,
  usePostUniPostsMutation,
  usePutUniPostsByIdMutation,
  useDeleteUniPostsByIdMutation,
} from './hydro-post-api';

const updateTimeout = 1000;
const storeRef = setupApiStore(api);
const passThrough = false;
const server = setupDefaultServer(passThrough);

describe('# UniPosts -- Endpoinsts', () => {
  let store: typeof storeRef['store'];

  beforeAll(async () => {
    ({ store } = storeRef);
  });

  it('## count', async () => {
    const { getUniPostsCount: count } = api.endpoints;

    const promise = store.dispatch(count.initiate({}));
    const result = await promise;

    const { data, error, isLoading, isError, isSuccess } = result;
    expect(isLoading).toBe(false);
    expect(error).toBeUndefined();
    expect(isError).toBe(false);
    expect(isSuccess).toBe(true);
    expect(data).toBeDefined();
  });

  it('## findMany & findById', async () => {
    const { getUniPosts: findMany, getUniPostsById: findOne } = api.endpoints;

    let endityId = 0;
    // findMany
    {
      const arg = { pagination: { limit: 3 } };
      const promise = store.dispatch(findMany.initiate(arg));
      const result = await promise;

      const { data, error, isLoading, isError, isSuccess } = result;
      expect(isLoading).toBe(false);
      expect(error).toBeUndefined();
      expect(isError).toBe(false);
      expect(isSuccess).toBe(true);
      expect(data).toBeDefined();
      expect(data?.data).toBeDefined();
      expect(data?.data?.length).toBe(arg.pagination.limit);
      endityId = data?.data ? data?.data[0].id : 0;
    }

    // findOne
    {
      const arg = { id: endityId };
      const promise = store.dispatch(findOne.initiate(arg));
      const result = await promise;

      const { data, error, isLoading, isError, isSuccess } = result;
      expect(isLoading).toBe(false);
      expect(error).toBeUndefined();
      expect(isError).toBe(false);
      expect(isSuccess).toBe(true);
      expect(data).toBeDefined();
      expect(data?.data).toBeDefined();
      expect(data?.data?.id).toBe(arg.id);
    }
  });
});

describe('# UniPosts -- Hooks', () => {
  let wrapper: typeof storeRef['wrapper'];
  let store: typeof storeRef['store'];

  beforeAll(async () => {
    ({ store, wrapper } = storeRef);
  });

  it('## findMany & findById', async () => {
    // findMany using hook
    const arg = { pagination: { limit: 5 } };
    const { result } = renderHook(() => useGetUniPostsQuery(arg), { wrapper });
    // wait response
    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: updateTimeout,
    });
    // check result
    const { data, error, isLoading, isError, isSuccess } = result.current;
    expect(isLoading).toBe(false);
    expect(error).toBeUndefined();
    expect(isError).toBe(false);
    expect(isSuccess).toBe(true);
    expect(data).toBeDefined();
    expect(data?.data).toBeDefined();
    expect(data?.data?.length).toBe(arg.pagination.limit);

    if (!data?.data) return;
    const postId = data?.data[0]?.id as number;

    //
    // findById
    const { result: result2 } = renderHook(
      () => useGetUniPostsByIdQuery({ id: postId }),
      { wrapper }
    );
    // wait
    await waitFor(() => expect(result2.current.isLoading).toBe(false), {
      timeout: updateTimeout,
    });
    // check
    expect(result2.current.isLoading).toBe(false);
    expect(result2.current.error).toBeUndefined();
    expect(result2.current.isError).toBe(false);
    expect(result2.current.data).toBeDefined();
    expect(result2.current.isSuccess).toBe(true);
    expect(result2.current.data?.data).toBeDefined();
  });
});

describe('# Uni Post with login', () => {
  let wrapper: typeof storeRef['wrapper'];
  let store: typeof storeRef['store'];

  beforeAll(async () => {
    ({ store, wrapper } = storeRef);
  });

  it('## createOne & updateById & deleteById', async () => {
    const postInput = {
      title: 'test uni-post title',
      content: 'test uni-post content',
      kind: 'topic' as const,
      category: 1,
    };
    const { result } = renderHook(() => usePostUniPostsMutation({}), {
      wrapper,
    });

    const [createOne] = result.current;
    act(() => {
      createOne({ body: { data: postInput } });
    });

    await waitFor(() => expect(result.current[1].isLoading).toBe(false), {
      timeout: updateTimeout,
    });

    const { error, data, isLoading, isError, isSuccess } = result.current[1];
    expect(isLoading).toBe(false);
    expect(error).toBeUndefined();
    expect(isError).toBe(false);
    expect(data).toBeDefined();
    expect(isSuccess).toBe(true);

    const postId = data?.data?.id as number;
    //
    // update by id
    const updateInput = {
      title: 'test title updated',
    };
    const { result: result2 } = renderHook(
      () => usePutUniPostsByIdMutation({}),
      { wrapper }
    );

    const [updateById] = result2.current;
    act(() => {
      updateById({ id: postId, body: { data: updateInput } });
    });

    await waitFor(() => expect(result2.current[1].isLoading).toBe(false), {
      timeout: updateTimeout,
    });

    const {
      error: error2,
      data: data2,
      isLoading: isLoading2,
      isError: isError2,
      isSuccess: isSuccess2,
    } = result2.current[1];
    expect(isLoading2).toBe(false);
    expect(error2).toBeUndefined();
    expect(isError2).toBe(false);
    expect(data2).toBeDefined();
    expect(isSuccess2).toBe(true);

    //
    // delete by id
    const { result: result3 } = renderHook(
      () => useDeleteUniPostsByIdMutation({}),
      { wrapper }
    );

    const [deleteById] = result3.current;
    act(() => {
      deleteById({ id: postId });
    });

    await waitFor(() => expect(result3.current[1].isLoading).toBe(false), {
      timeout: updateTimeout,
    });

    const {
      error: error3,
      data: data3,
      isLoading: isLoading3,
      isError: isError3,
      isSuccess: isSuccess3,
    } = result3.current[1];
    expect(isLoading3).toBe(false);
    expect(error3).toBeUndefined();
    expect(isError3).toBe(false);
    expect(data3).toBeDefined();
    expect(isSuccess3).toBe(true);
  });
});
