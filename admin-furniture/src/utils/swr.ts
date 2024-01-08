import "client-only";

import { mutate } from "swr";

/** Clear all API cache */
export const clearAPICache = () => mutate(() => true, undefined, { revalidate: false });
