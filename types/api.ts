export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  page: number;
  totalPages: number;
  total: number;
};

export type ApiError = {
  message: string;
  code?: string;
  status?: number;
};
