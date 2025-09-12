type PaginationT = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

type PaginationParamsT = {
  page: number;
  limit: number;
};
