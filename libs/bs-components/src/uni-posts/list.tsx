import React, { useState, useEffect, useRef, HTMLProps } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { 
  hydroApi, 
  formatRestRequestError, 
  GetUniPostsApiArg, 
  UniPostsCategory, 
  UniPostsPost, 
  useGetUniPostsCountQuery,
  useGetCategoriesByIdQuery,
} from '@howto/rtk-rest-api';
import Dropdown from 'react-bootstrap/Dropdown';
import { Container, Col, Row } from 'react-bootstrap';
import { ListChildComponentProps } from 'react-window';

import { BigListInfinite } from '../list/BigListInfinite';
import { CommentBox } from '../comment-box/comment-box';
import { useStore } from 'react-redux';

//
// Types
//
type QueryStatus = { 
  status: string; message: string;
};

type EntityCount = number;

type EntityData = UniPostsPost[];

interface UniPostsListProps extends HTMLProps<HTMLDivElement> {
  renderRow: (props: ListChildComponentProps) => JSX.Element | null;
  isItemLoaded: (index: number) => boolean;
  loadMoreItems: (startIndex: number, stopIndex: number) => void | Promise<void>;
  
  itemCount: number;

  categoryId?: number;

  categoryData?: UniPostsCategory;
}

//
// View component
//
const UniPostsListView: React.FC<UniPostsListProps> = (props) => (
  <div className={`container-fluid h-100`}>
    <div className={'row'}>
      <div className={'col'}>
        <p> Category: {props.categoryData && props.categoryData.attributes?.name} </p>
      </div>
    </div>

    <div className={'row flex-grow-1'}>
      <div className={'col'}>
        <BigListInfinite
          itemSize={35}
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

const pageSize = 29;

//
// Controller component
//
export function UniPostsList(props: Partial<UniPostsListProps>) {
  const store = useStore();

  const [queryStatus, setQueryStatus] = useState<QueryStatus>({ status: 'idle', message: '' });
  const [category, setCategory] = useState<number|undefined>(props.categoryId);
  const [entityCount, setEntityCount] = useState<EntityCount>(0);
  const entityData = useRef<EntityData>([] as EntityData);

  const filters = { category, kind: 'topic' };
  const countQueryResult = useGetUniPostsCountQuery({ filters }, { skip: !category });
  const categoryQueryResult = useGetCategoriesByIdQuery({ id: category as number }, { skip: !category });

  useEffect(() => {
    if (countQueryResult.isSuccess)
      setEntityCount(Math.min(countQueryResult.data, entityData.current.length + pageSize));
  }, [countQueryResult, entityData.current.length]);

  const _props = {
    renderRow,
    isItemLoaded,
    loadMoreItems,
    itemCount: entityCount,
    categoryData: categoryQueryResult.data?.data,
  };
  return (
    <UniPostsListView {..._props}/>
  );

  function onClickRowMenuItem(event: React.MouseEvent<HTMLButtonElement>) {
    console.log('>>>>>>', event.currentTarget.name);
    if (event.currentTarget.name) {
      const [cmd, id] = event.currentTarget.name.split(':');
      if (cmd === 'del') {
        _deleteOne(id);
      }
      countQueryResult.refetch();
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
    return _findMany({
      filters,
      pagination: { page: Math.floor(stopIndex / pageSize) + 1, pageSize },
      sort: 'createdAt',
      populate: '*',
    });
  }

  async function _findMany(arg: GetUniPostsApiArg) {
    if (queryStatus.status === 'loading') return;
    setQueryStatus({ status: 'loading', message: 'Loading' });

    const { getUniPosts: findMany } = hydroApi.endpoints;

    try {
      //@ts-ignore
      const res: any = await store.dispatch(findMany.initiate(arg));

      console.log('>>> findMany:', res);
      if (res.error) 
        return setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(res.error)) });

      setQueryStatus({ status: 'success', message: 'Success' });

    } catch (e) {
      setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(e)) });
    }
  }

  async function _deleteOne(id: string) {
    if (queryStatus.status === 'loading') return;
    setQueryStatus({ status: 'loading', message: 'Loading' });

    const { deleteUniPostsById: deleteOne } = hydroApi.endpoints;

    try {
      //@ts-ignore
      const res: any = await store.dispatch(deleteOne.initiate({ id: parseInt(id) }));
      console.log('>>> deleteOne:', res);
      if (res.error) 
        return setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(res.error)) });

      setQueryStatus({ status: 'success', message: 'Success' });
    } catch (e) {
      setQueryStatus({ status: 'error', message: JSON.stringify(formatRestRequestError(e)) });
    }
  }

}

export default UniPostsList;

