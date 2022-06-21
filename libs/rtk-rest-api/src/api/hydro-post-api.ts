import { baseApi as api } from './hydro-api';
import {
  uniPosts_onQueryStarted,
  uniPosts_onCacheEntryAdded,
} from '../slices/uni-posts.slice';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUniPosts: build.query<GetUniPostsApiResponse, GetUniPostsApiArg>({
      query: (queryArg) => ({
        url: `/uni-posts`,
        params: {
          sort: queryArg.sort,
          pagination: queryArg.pagination,
          fields: queryArg.fields,
          populate: queryArg.populate,
          filters: queryArg.filters,
        },
      }),
      onQueryStarted(arg, api) {
        return uniPosts_onQueryStarted(arg, api);
      },
      onCacheEntryAdded(arg, api) {
        return uniPosts_onCacheEntryAdded(arg, api);
      },
      providesTags: ['UniPosts'],
    }),
    getUniPostsCount: build.query<number, GetUniPostsCountApiArg>({
      query: (queryArg) => ({
        url: `/uni-posts/count`,
        params: {
          filters: queryArg.filters,
        },
      }),
    }),
    postUniPosts: build.mutation<PostUniPostsApiResponse, PostUniPostsApiArg>({
      query: (queryArg) => ({
        url: `/uni-posts`,
        method: 'POST',
        body: queryArg.body,
      }),
      invalidatesTags: ['UniPosts'],
    }),
    getUniPostsById: build.query<
      GetUniPostsByIdApiResponse,
      GetUniPostsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/uni-posts/${queryArg.id}`,
        params: {
          fields: queryArg.fields,
          populate: queryArg.populate,
        },
      }),
      onQueryStarted(arg, api) {
        return uniPosts_onQueryStarted(arg, api);
      },
    }),
    putUniPostsById: build.mutation<
      PutUniPostsByIdApiResponse,
      PutUniPostsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/uni-posts/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.body,
      }),
      invalidatesTags: ['UniPosts'],
    }),
    deleteUniPostsById: build.mutation<
      DeleteUniPostsByIdApiResponse,
      DeleteUniPostsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/uni-posts/${queryArg.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UniPosts'],
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as hydroPostApi };

export type UniPostsCategory = {
  id: number;
  attributes?: {
    name?: string;
    slug?: string;
    description?: string;
    kind?: 'system' | 'community';
    createdAt?: string;
    updatedAt?: string;
  };
};

export type ApiUser = {
  id: number;
  attributes?: {
    username?: string;
    email?: string;
  };
};

export type UniPostsPost = {
  id: number;
  attributes?: {
    title?: string;
    content?: string;
    kind?: 'topic' | 'reply';
    category?: {
      data?: UniPostsCategory;
    };
    parent?: {
      data?: UniPostsPost;
    };
    user?: {
      data?: ApiUser;
    };
    createdAt?: string;
    updatedAt?: string;
  };
};

export type GetUniPostsApiResponse = /** status 200 OK */ {
  data?: UniPostsPost[];
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
};

export type GetUniPostsApiArg = {
  /** Sort by attributes ascending (asc) or descending (desc) */
  sort?: string;
  pagination?: {
    withCount?: boolean;
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  /** Fields to return (ex: title,author) */
  fields?: string;
  /** Relations to return */
  populate?: string;
  // filter condition
  filters?: Record<string, any>;
};

export type GetUniPostsCountApiArg = {
  // filter condition
  filters?: Record<string, any>;
};

export type PostUniPostsApiResponse = /** status 200 OK */ {
  data?: UniPostsPost;
};

export type PostUniPostsApiArg = {
  body: {
    data?: {
      category: number;
      title?: string;
      content: string;
      kind: 'topic' | 'reply';
      parent?: number;
    };
  };
};

export type GetUniPostsByIdApiResponse = /** status 200 OK */ {
  data?: UniPostsPost;
  meta?: object;
};

export type GetUniPostsByIdApiArg = {
  id: number;
  /** Fields to return (ex: title,author) */
  fields?: string;
  /** Relations to return */
  populate?: string;
};

export type PutUniPostsByIdApiResponse = /** status 200 OK */ {
  data?: UniPostsPost;
};

export type PutUniPostsByIdApiArg = {
  id: number;
  body: {
    data?: {
      title?: string;
      content?: string;
      kind?: 'topic' | 'reply';
      category?: number | string;
      parent?: number | string;
      user?: number | string;
      createdAt?: string;
      updatedAt?: string;
      createdBy?: number | string;
      updatedBy?: number | string;
    };
  };
};

export type DeleteUniPostsByIdApiResponse = /** status 200 OK */ number;

export type DeleteUniPostsByIdApiArg = {
  id: number;
};

export const {
  useGetUniPostsQuery,
  useGetUniPostsCountQuery,
  usePostUniPostsMutation,
  useGetUniPostsByIdQuery,
  usePutUniPostsByIdMutation,
  useDeleteUniPostsByIdMutation,
} = injectedRtkApi;
