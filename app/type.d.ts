type PaginationT = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type QueryParamsT = {
  page: number;
  limit: number;
  search?: string;
};
