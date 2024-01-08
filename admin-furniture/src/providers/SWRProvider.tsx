import { ErrorResponse } from "@/types/shared";
import { fetcher } from "@/utils/fetcher";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

type Props = {
  children: ReactNode;
};

function SWRProvider({ children }: Props) {
  // Mocking API Responses
  //   useEffect(() => {
  //     mockAPI();
  //   }, []);

  return (
    <SWRConfig
      value={{
        fetcher,
        onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
          const _error = error as ErrorResponse<unknown>;

          // Only retry on error 500-599
          //   if (!_error.code?.startsWith("5")) return;

          // Only retry up to 5 times.
          if (retryCount >= 5) return;

          // Retry after 5 seconds.
          setTimeout(() => revalidate({ retryCount }), 5000);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SWRProvider;
