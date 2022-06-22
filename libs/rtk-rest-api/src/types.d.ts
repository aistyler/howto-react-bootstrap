import { baseApi } from "./api/hydro-api";
import { hydroPostApi } from "./api/hydro-post-api";
import { hydroCategoryApi } from "./api/hydro-category-api";
export type HydroApi = 
  typeof hydroPostApi &
  typeof hydroCategoryApi &
  typeof baseApi;
