import type { HydroApi } from './types';
import { baseApi, STORE_KEY_HYDRO_API } from './api/hydro-api';

export * from './api/hydro-post-api';
export * from './api/hydro-category-api';
export * from './slices/uni-posts.slice';
export * from './lib/api-utils';
export * from './lib/middlewares';
export * from './lib/reducers';

export const hydroApi = baseApi as HydroApi;
export {
  STORE_KEY_HYDRO_API,
}
