import { User, WithToken } from "@/types/user";
import { useSession } from "next-auth/react";

/**
 * Get current user data
 *
 * @returns `[ user, isLoading ]`
 */
function useCurrentUser(): [
  (User & Pick<WithToken, "accessToken">) | undefined,
  boolean,
] {
  const { data, status } = useSession();

  return [data?.user, status == "loading"];
}

export default useCurrentUser;
