import React, { useState, useEffect, useRef, HTMLProps, ReactEventHandler } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { 
  hydroApi, 
  formatRestRequestError, 
  GetUniPostsApiArg, 
  UniPostsCategory, 
  UniPostsPost, 
  useGetUniPostsCountQuery,
  useGetCategoriesByIdQuery,
  RtkQueryError,
  uniPostsEntityIds,
  uniPostsEntitiesAsArray,
  PostUniPostsApiArg,
  uniPostsCacheAdd,
  uniPostsCacheRemove,
  PutUniPostsByIdApiArg,
  uniPostsCacheUpsert,
} from '@howto/rtk-rest-api';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { ListChildComponentProps } from 'react-window';

import { BigListInfinite } from '../list/BigListInfinite';
import { CommentBox } from '../comment-box/comment-box';
import { useStore } from 'react-redux';
import { AppState, AppStore } from '@howto/hydro-store';

//
// Types
//
type QueryStatus = { 
  status: string; message: string;
};

type EntityCount = number;

type EntityData = UniPostsPost[];

interface UniPostsListProps extends HTMLProps<HTMLDivElement> {
  queryStatus: QueryStatus;
  renderRow: (props: ListChildComponentProps) => JSX.Element | null;
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => void | Promise<void>;
  
  entityCount: number;

  itemCount: number;

  categoryId?: number;

  categoryData?: UniPostsCategory;

  listRef?: React.Ref<HTMLDivElement | undefined>;

  buttonClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
}

//
// View component
//
const UniPostsCommentListView: React.FC<UniPostsListProps> = (props) => (
  <div className={`container-fluid d-flex flex-column h-90`}>
    <div className={'row'}>
      <div className={'col'}>
        <p> Category: {props.categoryData && props.categoryData.attributes?.name} ({props.itemCount}/{props.entityCount}) </p>
        <button name={'new_post'} onClick={props.buttonClickHandler}>new post</button>
        <button name={'update_post'} onClick={props.buttonClickHandler}>update post</button>
        <button name={'delete_post'} onClick={props.buttonClickHandler}>delete post</button>
        <p>{props.queryStatus.message || ''}</p>
      </div>
    </div>
    <div className={'row flex-grow-1'}>
      <div className={'col'}>
        <BigListInfinite
          ref={props.listRef}
          itemSize={150}
          isItemLoaded={props.isItemLoaded}
          loadMoreItems={props.loadMoreItems}
          itemCount={props.itemCount}
          memonized
        >
          {props.renderRow}
        </BigListInfinite>
      </div>
    </div>
  </div>
);

const pageSize = 15;

//
// Controller component
//
export function UniPostsComments(props: Partial<UniPostsListProps>) {
  const store = useStore() as AppStore;
  const listRef = useRef<HTMLDivElement>();

  const [queryStatus, setQueryStatus] = useState<QueryStatus>({ status: 'idle', message: '' });
  const [category, setCategory] = useState<number|undefined>(props.categoryId);
  const [itemCount, setItemCount] = useState(0);
  const entityData = useRef<EntityData>([] as EntityData);

  const filters = { category, kind: 'topic' };
  const countQueryResult = useGetUniPostsCountQuery({ filters }, { skip: !category });
  const categoryQueryResult = useGetCategoriesByIdQuery({ id: category as number }, { skip: !category });
  const entityCount = countQueryResult.data || 0;

  const updateItemCount = () => setItemCount(Math.min(countQueryResult.data || 0, entityData.current.length + pageSize));
  useEffect(() => {
    if (countQueryResult.isSuccess)
      updateItemCount();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countQueryResult, entityData.current.length]);

  console.log(`category: ${category}, count: ${itemCount}/${entityCount}, dataLen: ${entityData.current.length}, status: ${queryStatus.status}`);

  // render
  const _props = {
    queryStatus,
    renderRow,
    isItemLoaded,
    loadMoreItems,
    entityCount,
    itemCount,
    categoryData: categoryQueryResult.data?.data,
    listRef,
    buttonClickHandler,
  };
  return (
    <UniPostsCommentListView {..._props}/>
  );

  async function buttonClickHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    console.log('>>>>>>>>>>', event.currentTarget.name);
    if ('new_post' === event.currentTarget.name) {
      await _createOne({ body: { data: {
        title: 'created by howto react-bootstarp at' + Date.now(),
        content: 'content ' + Date.now(),
        category: category as number,
        kind: 'topic',
      }}});
    }
    else if ('update_post' === event.currentTarget.name) {
      _updateOne({
        id: uniPostsEntityIds(store.getState()).at(0) as number,
        body: { data: {
          content: 'updated at' + Date.now(),
        }}
      });
    }
    else if ('delete_post' === event.currentTarget.name) {
      _deleteOne(uniPostsEntityIds(store.getState()).at(0) as number);
    }
  }

  async function onClickRowMenuItem(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('>>>>>>', event.currentTarget.name);
    if (event.currentTarget.name) {
      const [cmd, id] = event.currentTarget.name.split(':');
      if (cmd === 'del') {
        console.log('*** 1');
        setTimeout(() =>_deleteOne(parseInt(id)), 10);
      }
    }
  }

  function renderRow({ index, style }: ListChildComponentProps) {
    const item = entityData.current[index];
    if (!item) return null;
    return (
      <li style={style} className="list-group-item">
        <CommentBox item={item} onClickMenuItem={onClickRowMenuItem}/>
      </li>
    );
  }

  function isItemLoaded(index: number): boolean {
    if (entityData.current && entityData.current.length > index)
      return true;
    return false;
  }

  async function loadMoreItems(startIndex: number, stopIndex: number) {
    const page = Math.floor(stopIndex / pageSize) + 1;
    console.log('>>>>>>>>>>> loadMore page:', page);
    return await _findMany({
      filters,
      pagination: { page, pageSize },
      sort: 'createdAt:desc',
      populate: '*',
    });
  }

  async function _findMany(arg: GetUniPostsApiArg) {
    console.log('*** _findMany:', queryStatus.status);
    if (queryStatus.status === 'loading') return;
    setQueryStatus({ status: 'loading', message: 'Loading' });

    const { getUniPosts: findMany } = hydroApi.endpoints;

    try {
      const res = await store.dispatch(findMany.initiate(arg));

      console.log('>>> findMany:', res);
      if (res.error) 
        return setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(res.error)) });

      // set entityData
      const state = store.getState() as AppState;
      console.log('>>> normalized data:', uniPostsEntityIds(state));
      // set data
      entityData.current = (uniPostsEntitiesAsArray(state) as UniPostsPost[]).filter(
        (e) => e?.attributes?.category?.data?.id === category && e?.attributes?.kind === 'topic'
      );

      setQueryStatus({ status: 'success', message: 'Success' });
    } catch (e) {
      setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(e as RtkQueryError)) });
    }
  }

  async function _createOne(arg: PostUniPostsApiArg) {
    console.log('*** _createOne:', queryStatus.status);
    if (queryStatus.status === 'loading') return;
    setQueryStatus({ status: 'loading', message: 'Loading' });

    const { postUniPosts: createOne } = hydroApi.endpoints;

    try {
      const res = await store.dispatch(createOne.initiate(arg));
      
      console.log('>>> _createOne:', res);
      if ('error' in res) 
        return setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(res.error)) });

      // add to cache, entityData
      if (res.data.data) {
        entityData.current.splice(0, 0, res.data.data);
        // store
        uniPostsCacheAdd(res.data.data, store.dispatch);
      }

      // update count
      // updateItemCount();
      countQueryResult.refetch();

      setQueryStatus({ status: 'success', message: 'Success' });
      countQueryResult.refetch();
    } catch (e) {
      setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(e as RtkQueryError)) });
    }
  }

  async function _updateOne(arg: PutUniPostsByIdApiArg) {
    console.log('*** _updateOne:', queryStatus.status);
    if (queryStatus.status === 'loading') return;
    setQueryStatus({ status: 'loading', message: 'Loading' });

    const { putUniPostsById: updateOne } = hydroApi.endpoints;

    try {
      const res = await store.dispatch(updateOne.initiate(arg));
      
      console.log('>>> _updateOne:', res);
      if ('error' in res) 
        return setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(res.error)) });

      // update from cache, entityData
      if (res.data.data) {
        const idx = entityData.current.findIndex((e) => e.id === arg.id );
        if (idx >= 0) entityData.current.splice(idx, 1, res.data.data);
        // store
        uniPostsCacheUpsert(res.data.data, store.dispatch);
      }

      // update count
      // updateItemCount();
      countQueryResult.refetch();

      setQueryStatus({ status: 'success', message: 'Success' });
      countQueryResult.refetch();
    } catch (e) {
      setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(e as RtkQueryError)) });
    }
  }

  async function _deleteOne(id: number) {
    console.log('*** _deleteOne:', queryStatus.status);
    if (queryStatus.status === 'loading') return;
    console.log('*** 3');
    setQueryStatus({ status: 'loading', message: 'Loading' });
    console.log('*** 4');
    const { deleteUniPostsById: deleteOne } = hydroApi.endpoints;

    try {
      console.log('>>>>>>>> start delete query:', id);
      const res = await store.dispatch(deleteOne.initiate({ id }));
      console.log('>>> deleteOne:', res);
      if ('error' in res)
        return setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(res.error as RtkQueryError)) });

      // remove from cache, entityData
      const idx = entityData.current.findIndex((e) => e.id === id);
      if (idx >= 0) entityData.current.splice(idx, 1);
      // store
      uniPostsCacheRemove(id, store.dispatch);

      // update count
      //updateItemCount();
      countQueryResult.refetch();

      setQueryStatus({ status: 'success', message: 'Success' });
    } catch (e) {
      setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(e as RtkQueryError)) });
    }
  }
}

export default UniPostsComments;
