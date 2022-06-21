// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {
  createApi,
  fetchBaseQuery,
  retry,
  BaseQueryFn,
} from '@reduxjs/toolkit/query/react';
import {
  FetchArgs,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { RetryOptions } from '@reduxjs/toolkit/dist/query/retry';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import type { HydroQueryError } from '../lib/api-utils';

import qs from 'qs';

const BASE_URL = 'http://localhost:1337/api';

const staggeredBaseQueryWithBailOut: BaseQueryFn<
  string | FetchArgs,
  unknown,
  HydroQueryError,
  RetryOptions
> = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    if (typeof args === 'object' && args.params) {
      args.params = qs.stringify(args.params) as any;
    }
    const result = (await fetchBaseQuery({
      baseUrl: BASE_URL,
    })(args, api, extraOptions)) as QueryReturnValue<
      unknown,
      HydroQueryError,
      FetchBaseQueryMeta
    >;

    // bail out of re-tries immediately if unauthorized,
    // because we know successive re-retries would be redundant
    if (result.error?.status === 401) {
      retry.fail(result.error);
    }
    return result;
  },
  {
    maxRetries: 0,
  }
);

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: 'hydroApi',
  baseQuery: staggeredBaseQueryWithBailOut,
  // global configuration for the api
  // *N.B*
  // Clear browser's storage data to apply the changes.
  //keepUnusedDataFor: 3,
  refetchOnMountOrArgChange: 10,
  tagTypes: ['UniPosts'],
  endpoints: () => ({}),
});
