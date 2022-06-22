import {
  createEntityAdapter,
  createSelector,
  createSlice,
  Dispatch,
  EntityState,
  PayloadAction,
  Update,
} from '@reduxjs/toolkit';
import type {
  GetUniPostsApiArg,
  GetUniPostsByIdApiResponse,
  UniPostsPost,
} from '../api/hydro-post-api';

export type UniPostEntity = GetUniPostsByIdApiResponse['data'];

export const STORE_KEY_UNI_POSTS = 'uniPostsList';

export interface UniPostsState extends EntityState<UniPostEntity> {
  pageSize?: number;
  pageCount?: number;
  total?: number;
}

const entityAdapter = createEntityAdapter<UniPostEntity>({
  selectId: (entity) => entity?.id ?? 0,
  sortComparer: (a, b) => (b?.id ? b?.id - (a?.id ?? 0) : 0),
});

const initialState: UniPostsState = entityAdapter.getInitialState({});

export const uniPostsSlice = createSlice({
  name: STORE_KEY_UNI_POSTS,
  initialState: initialState,
  reducers: {
    add: entityAdapter.addOne,
    remove: entityAdapter.removeOne,
    update: entityAdapter.updateOne,
    upsert: entityAdapter.upsertOne,
    addMany: entityAdapter.addMany,
    removeAll: entityAdapter.removeAll,
    upsertMany: entityAdapter.upsertMany,
    setMeta: (
      state,
      action: PayloadAction<
        Pick<UniPostsState, 'pageSize' | 'pageCount' | 'total'>
      >
    ) => {
      state.pageSize = action.payload.pageSize;
      state.pageCount = action.payload.pageCount;
      state.total = action.payload.total;
    },
    addManyWithMeta: (state, action) => {
      entityAdapter.addMany(state, action.payload.data);
      state.pageSize = action.payload.pageSize;
      state.pageCount = action.payload.pageCount;
      state.total = action.payload.total;
    },
    upsertManyWithMeta: (state, action) => {
      entityAdapter.upsertMany(state, action.payload.data);
      state.pageSize = action.payload.pageSize;
      state.pageCount = action.payload.pageCount;
      state.total = action.payload.total;
    },
  },
});

export const uniPostsActions = uniPostsSlice.actions;

/**
 * Entity adapter selector
 *
 * const { selectAll } = uniPostsAdapterSelector();
 *
 * @returns EntitySelectors
 */
export const uniPostsAdapterSelector = () => {
  return entityAdapter.getSelectors<any>((state) => state[STORE_KEY_UNI_POSTS]);
};

export const uniPostsCacheAdd = (item: UniPostsPost, dispatch: Dispatch) => dispatch(uniPostsActions.add(item));
export const uniPostsCacheAddMany = (items: UniPostsPost[], dispatch: Dispatch) => dispatch(uniPostsActions.addMany(items));
export const uniPostsCacheRemove = (id: number, dispatch: Dispatch) => dispatch(uniPostsActions.remove(id));
export const uniPostsCacheRemoveAll = (dispatch: Dispatch) => dispatch(uniPostsActions.removeAll());
export const uniPostsCacheUpsert = (item: UniPostsPost, dispatch: Dispatch) => dispatch(uniPostsActions.upsert(item));
export const uniPostsCacheUpsertMany = (items: UniPostsPost[], dispatch: Dispatch) => dispatch(uniPostsActions.upsertMany(items));
export const uniPostsCacheUpdate = (update: Update<UniPostsPost>, dispatch: Dispatch) => dispatch(uniPostsActions.update(update));

/**
 * Entity adapter store state
 *
 * const { pageSize, pageCount, total } = uniPostAdapterState(store.getState());
 *
 * @param appState
 * @returns
 */
export const uniPostsAdapterState = (appState: any): UniPostsState =>
  appState[STORE_KEY_UNI_POSTS];

const { selectAll, selectEntities, selectIds } = entityAdapter.getSelectors();

/**
 * All entity Ids as an Array
 */
export const uniPostsEntityIds = createSelector(
  uniPostsAdapterState,
  selectIds
);

/**
 * All entities as an Array
 */
export const uniPostsEntitiesAsArray = createSelector(
  uniPostsAdapterState,
  selectAll
);

/**
 * All entities as a Dictionary
 */
export const uniPostsEntitiesAsDict = createSelector(
  uniPostsAdapterState,
  selectEntities
);

export const uniPosts_onQueryStarted = async (
  arg: any,
  cacheLifeCycle: any
) => {
  //console.log('[API]>>> START:', arg);
  try {
    await cacheLifeCycle.queryFulfilled;
    //console.log('[API]>>> DONE:', arg);

    const { data, isSuccess } = cacheLifeCycle.getCacheEntry();
    if (isSuccess && data && data.data) {
      // normalize data and save to store
      //cacheLifeCycle.updateCachedData(() =>

      cacheLifeCycle.dispatch(
        uniPostsActions.upsertManyWithMeta({
          data: Array.isArray(data.data) ? data.data : [data.data],
          ...(data.meta?.pagination ? data.meta.pagination : {}),
        })
      );

      //);
    }

    // console.log(
    //   '[API]>>> fetched data:', Array.isArray(data.data) ? data.data.length : data.data
    // );
  } catch {
    //
  }
};
/*
export const noopsOnTransformResponse = (
  response: GetNoopsApiResponse,
  meta: any,
  arg: GetNoopsApiArg
): EntityState<NoopEntity> => {
  if (!response.data) return {
    ids: [],
    entities: {},
  };
  console.log('>>>>>> transform:', arg);
  return noopsAdapter.addMany(
    noopsAdapter.getInitialState(),
    response.data
  );
};
*/
export const uniPosts_onCacheEntryAdded = async (
  arg: GetUniPostsApiArg,
  cacheLifeCycle: any
) => {
  //console.log('[API]>>> start fetch query:', cacheLifeCycle.getCacheEntry());
  try {
    // wait for data fetch
    await cacheLifeCycle.cacheDataLoaded;
    //console.log('[API]>>> finish fetch query:', cacheLifeCycle.getCacheEntry());

    const { data, isSuccess } = cacheLifeCycle.getCacheEntry();
    if (isSuccess && data && data.data) {
      // normalize data and save to store
      //cacheLifeCycle.updateCachedData(() =>
      // cacheLifeCycle.dispatch(
      //   uniPostsActions.upsertManyWithMeta({
      //     data: data.data,
      //     ...(data.meta?.pagination ? data.meta.pagination : {}),
      //   })
      // )
      //);
    }
  } catch (_e) {
    // got an exception but ignore it.
    // See the example on
    // https://redux-toolkit.js.org/rtk-query/usage/streaming-updates#websocket-chat-api-with-a-transformed-response-shape
    //console.log(_e);
  } finally {
    await cacheLifeCycle.cacheEntryRemoved;
  }
};
