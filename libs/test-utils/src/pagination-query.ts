type PaginationQuery = {
  withCount?: string;
  page?: string;
  pageSize?: string;
  start?: string;
  limit?: string;
};

type Pagination = {
  withCount?: boolean;
  page?: number;
  pageSize?: number;
  start?: number;
  limit?: number;
};
type PaginationKey = keyof Pagination;

export const validatePaginationQuery = (parsed: Record<string, any>) => {
  const pgstr = parsed['pagination'] as PaginationQuery;
  // type conversion
  const pg: Pagination = (
    Object.keys(pgstr) as PaginationKey[]
  ).reduce<Pagination>((acc: Pagination, k) => {
    if (k === 'withCount') acc[k] = pgstr[k] === 'true';
    else if (pgstr[k]) acc[k] = parseInt(pgstr[k] as string);
    return acc;
  }, {});
  return pg;
};
