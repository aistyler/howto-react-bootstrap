import { rest } from 'msw';
import uniPostsOne from './mock-data/uni-posts_one.json';
import uniPostsMany from './mock-data/uni-posts_many.json';
import err400InvalidSyntax from './mock-data/error_400-invalid-syntax.json';

import qs from 'qs';
import { validatePaginationQuery } from './pagination-query';

export { uniPostsOne, uniPostsMany };

export const API_BASE_URL = 'http://localhost:1337/api';

const DEFAULT_PAGE_SIZE = 5;
const MAX_LIMIT_SIZE = 30;
const MAX_PAGE_SIZE = MAX_LIMIT_SIZE;
const MAX_ENTITIES = 500;

interface BaseEntity extends Record<string, unknown> {
  data: {
    id: number;
    attributes: any;
  };
}
const _mswFindManyHandler = (url: string, baseEntity: BaseEntity) => {
  return rest.get(`${API_BASE_URL}${url}`, (req, res, ctx) => {
    let start = 0;
    let limit = MAX_LIMIT_SIZE;
    let pageSize = DEFAULT_PAGE_SIZE;
    let withCount = false;
    if (req.url.search) {
      const parsed = qs.parse(req.url.search.substring(1));
      if (parsed && 'pagination' in parsed) {
        // type conversion
        const pg = validatePaginationQuery(parsed);
        //
        pageSize =
          !pg.pageSize || pg.pageSize > MAX_PAGE_SIZE
            ? DEFAULT_PAGE_SIZE
            : pg.pageSize;
        start = pg.start ?? (pg.page ? (pg.page - 1) * pageSize : 0);

        limit = pg.pageSize ?? pg.limit ?? pageSize;
        if (start + limit > MAX_ENTITIES) limit = MAX_ENTITIES - start;
        withCount = pg.withCount ?? false;
      }
    }
    const data = Array.from({ length: limit }).map((_, idx) => ({
      ...baseEntity.data,
      id: start + idx + 1,
    }));
    const meta = {
      pagination: {
        page: Math.floor(start / pageSize) + 1,
        pageSize,
        ...(withCount
          ? {
              pageCount: Math.ceil(MAX_ENTITIES / pageSize),
              total: MAX_ENTITIES,
            }
          : {}),
        start,
        limit,
      },
    };
    return res(ctx.status(200), ctx.json({ data, meta }));
  });
};
const _mswFindOneHandlers = (
  url: string,
  resArr: any[],
  status = 200,
  passthrough = false
) =>
  resArr.map((e) =>
    rest.get(`${API_BASE_URL}${url}`, (req, res, ctx) =>
      status === -1
        ? res.networkError(e)
        : passthrough
        ? req.passthrough()
        : res(
            ctx.status(status),
            ctx.json({
              data: { ...e.data, id: parseInt(req.params['id'] as string) },
            })
          )
    )
  );
const _mswPostHandlers = (
  url: string,
  resArr: any[],
  status = 200,
  passthrough = false
) =>
  resArr.map((e) =>
    rest.post(`${API_BASE_URL}${url}`, (req, res, ctx) =>
      status === -1
        ? res.networkError(e)
        : passthrough
        ? req.passthrough()
        : res(ctx.status(status), ctx.json(e))
    )
  );

const _mswPutHandlers = (
  url: string,
  resArr: any[],
  status = 200,
  passthrough = false
) =>
  resArr.map((e) =>
    rest.put(`${API_BASE_URL}${url}`, (req, res, ctx) =>
      status === -1
        ? res.networkError(e)
        : passthrough
        ? req.passthrough()
        : res(ctx.status(status), ctx.json(e))
    )
  );

const _mswDeleteHandlers = (
  url: string,
  resArr: any[],
  status = 200,
  passthrough = false
) =>
  resArr.map((e) =>
    rest.delete(`${API_BASE_URL}${url}`, (req, res, ctx) =>
      status === -1
        ? res.networkError(e)
        : passthrough
        ? req.passthrough()
        : res(ctx.status(status), ctx.json(e))
    )
  );

/**
 * Passthrough handler
 */
export const mswDefaultPassthroughHandlers = [
  ..._mswFindOneHandlers('/*', [1], 0, true),
  ..._mswPostHandlers('/*', [1], 0, true),
];

/**
 * Multiple handlers by a feature
 */
export const mswSuccessHandlers = {
  getUniPosts: [_mswFindManyHandler('/uni-posts', uniPostsOne)],
  getUniPostsById: _mswFindOneHandlers('/uni-posts/:id', [uniPostsOne]),
  postUniPosts: _mswPostHandlers('/uni-posts', [uniPostsOne]),
  putUniPostsById: _mswPutHandlers('/uni-posts/:id', [uniPostsOne]),
  deleteUniPostsById: _mswDeleteHandlers('/uni-posts/:id', [uniPostsOne]),
};

/**
 * The first handler only by each handlers
 */
export const mswDefaultSuccessHandlers = Object.values(mswSuccessHandlers).map(
  (h) => h[0]
);

export const mswErrorHandlers = {
  getUniPosts: [
    ..._mswFindOneHandlers('/uni-posts', ['Failed to connect'], -1),
    ..._mswFindOneHandlers('/uni-posts', [err400InvalidSyntax], 400),
  ],
};

/**
 * The first handler only by each handlers
 */
export const mswDefaultErrorHandlers = Object.values(mswErrorHandlers).map(
  (h) => h[0]
);
