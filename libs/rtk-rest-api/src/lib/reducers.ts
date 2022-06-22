import type { HydroApi } from '../types';
import { baseApi } from '../api/hydro-api';
import { uniPostsSlice } from '../slices/uni-posts.slice';

export const hydroApiReducers = {
  [baseApi.reducerPath]: (baseApi as HydroApi).reducer,
  [uniPostsSlice.name]: uniPostsSlice.reducer,
};
