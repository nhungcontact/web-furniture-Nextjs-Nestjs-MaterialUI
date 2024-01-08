import "client-only";
import { ErrorResponse, FetchOptions, ListResponse } from "@/types/shared";
import useSWRMutation, { SWRMutationConfiguration } from "swr/mutation";
import { fetcher } from "@/utils/fetcher";
import { useSWRConfig } from "swr";

export type MutateRelatedDataList<T> = {
  /** The (API) path of the data list which should be mutated */
  mutatePath: string;
  /** Used to compare new data with list item, default using `_id` property to compare the 2 objects */
  isEqual?: (a: T, b: T) => boolean;
  /** Specify where to insert new data if it isn't found from the list, leave `undefined` to skip inserting */
  insertOnNotFound?: "start" | "end";
  /** Use when `delete` data. The matched data should be removed from the list instead of update. */
  shouldRemove?: boolean;
  /** Re-call API to update the list instead of manually update cache. Useful when you don't know where to insert new data in */
  shouldRevalidate?: boolean;
};

export type WithID = { _id: unknown };

/** Wrapped mutation of SWR, see more at https://swr.vercel.app/docs/mutation#useswrmutation */
function useMutation<Data extends WithID, Body = unknown, Params = unknown>(
  options: FetchOptions<Params, Body> & {
    mutateRelatedDataList?: MutateRelatedDataList<Data>;
  },
  config?: SWRMutationConfiguration<Data, ErrorResponse<Data>>,
) {
  const { mutate } = useSWRConfig();
  const { mutateRelatedDataList, ...fetchOpts } = options;

  return useSWRMutation<
    Data,
    ErrorResponse<Data>,
    FetchOptions<Params, Body>,
    Partial<FetchOptions<Params, Body>> | undefined
  >(
    {
      path: fetchOpts.path,
      params: fetchOpts.params,
    },
    (_, { arg }) =>
      fetcher<Data, Params, Body>({
        ...fetchOpts,
        ...arg,
      } as FetchOptions<Params, Body>),
    {
      ...config,
      revalidate: false,
      onSuccess: (_data, _key, _config) => {
        mutate<Data>(
          (key) =>
            typeof key === "object" &&
            (key as FetchOptions<Params, Body>)?.path == fetchOpts.path,
          (currentData) => {
            return {
              ...currentData,
              ..._data,
            };
          },
          {
            revalidate: false,
          },
        );
        if (!!mutateRelatedDataList) {
          const {
            mutatePath,
            insertOnNotFound,
            shouldRemove,
            shouldRevalidate,
            isEqual,
          } = mutateRelatedDataList;

          if (shouldRemove) {
            mutate<Data>(
              (key) =>
                typeof key === "object" &&
                (key as FetchOptions<Params, Body>)?.path == fetchOpts.path,
              undefined,
              {
                revalidate: false,
              },
            );
          }

          mutate<ListResponse<Data>>(
            (key) =>
              typeof key === "object" &&
              (key as FetchOptions<Params, Body>)?.path == mutatePath,
            (currentData) => {
              if (!currentData || shouldRevalidate) {
                return currentData;
              }

              const index = currentData.items.findIndex((item) => {
                if (!!isEqual) {
                  return isEqual(item, _data);
                }
                return item._id === _data._id;
              });

              if (shouldRemove) {
                return {
                  ...currentData,
                  total: currentData.total - 1,
                  items: [
                    ...currentData.items.slice(0, index),
                    ...currentData.items.slice(index + 1),
                  ],
                };
              }

              const updatedData = { ...currentData };

              if (index < 0) {
                if (insertOnNotFound) {
                  updatedData.total += 1;
                  if (insertOnNotFound == "start") {
                    updatedData.items.unshift(_data);
                  }
                  if (insertOnNotFound == "end") {
                    updatedData.items.push(_data);
                  }
                }
              } else {
                updatedData.items[index] = _data;
              }

              return updatedData;
            },
            {
              revalidate: !!shouldRevalidate,
            },
          );
        }
        if (!!config?.onSuccess) {
          config?.onSuccess(_data, _key, _config);
        }
      },
    } as SWRMutationConfiguration<Data, ErrorResponse<Data>>,
  );
}

export default useMutation;
