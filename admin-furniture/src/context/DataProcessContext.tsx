/* eslint-disable @typescript-eslint/no-explicit-any */
import useQueryParams from "@/hooks/shared/useQueryParams";
import { ContextProps } from "@/types/context";
import { ListOptions, ListResponse } from "@/types/shared";
import { createContext, useState } from "react";

export type DataProcessType = {
  data: ListResponse<any> | undefined;
  handleSetData: (data: ListResponse<any>) => Promise<boolean>;
  count: number;
  page: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, page: number) => Promise<boolean>;
  isAdmin: boolean;
  handleResetFirstPage: () => Promise<boolean>;
};

export const DataProcessContext = createContext<DataProcessType>({
  data: undefined,
  handleSetData: async () => false,
  count: 0,
  page: 1,
  handleChangePage: async () => false,
  isAdmin: true,
  handleResetFirstPage: async () => false,
});
const num = 10;
export const DataProcessProvider = ({ children }: ContextProps) => {
  const [data, setData] = useState<ListResponse<any> | undefined>(undefined);
  const [count, setCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [, setParams] = useQueryParams<ListOptions>();
  const isAdmin = true;

  const handleSetData = async (data: ListResponse<any>) => {
    const calcTotal = Math.ceil(data.total / num);
    setData(data);
    setCount(calcTotal);
    return true;
  };
  const handleChangePage = async (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setParams({
      limit: 10,
      offset: page * num - 10,
    });
    return true;
  };
  const handleResetFirstPage = async () => {
    setCount(1);
    setPage(1);
    return false;
  };
  return (
    <DataProcessContext.Provider
      value={{
        data,
        handleSetData,
        count,
        page,
        handleChangePage,
        isAdmin,
        handleResetFirstPage,
      }}
    >
      {children}
    </DataProcessContext.Provider>
  );
};
