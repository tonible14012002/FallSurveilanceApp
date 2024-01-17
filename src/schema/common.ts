export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export type Pageable = {
  size: number;
  next_page: number | null;
  previous_page: number | null;
  total_page: number;
};

export interface BaseResponse<T> {
  status_code?: number;
  data: T;
  pageable?: Pageable;
}
