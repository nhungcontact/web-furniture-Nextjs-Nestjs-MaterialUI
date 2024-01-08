export interface SortOptions<T> {
  sortBy: keyof T;
  sortOrder: "asc" | "desc";
}

// eslint-disable-next-line
export type ListOptions<T = any> = Partial<T> & {
  limit?: number;
  offset?: number;
  search?: string;
  searchBy?: (keyof T)[];
  sortBy?: keyof T;
  sortOrder?: "asc" | "desc";
};

export interface ListResponse<T> {
  items: T[];
  total: number;
  options: ListOptions<T>;
}

export interface ErrorResponse<T> {
  code: string;
  message: string;
  details?: {
    [Key in keyof T]: string;
  };
}

export type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type FetchOptions<Params = unknown, Body = unknown> = {
  method?: FetchMethod;
  path: string;
  params?: Params;
  body?: Body;
  headers?: {
    [key: string]: string;
  };
};
