import "client-only";
import { User, UserRole } from "@/types/user";
import useCurrentUser from "./useCurrentUser";

/**
 * `CLIENT ONLY`
 *
 * Check if current user matched the roles.
 *
 * `role` can be single role or array of roles, `role=undefined` will allow any roles.
 *
 * **While loading, `isMatched == undefined`**
 *
 * @returns `[isMatched, currentUser]`
 * */
function useRole(role?: UserRole | UserRole[]): [boolean | undefined, User | undefined] {
  const [user, loading] = useCurrentUser();

  if (loading) {
    return [undefined, undefined];
  }

  let matched = false;

  if (user && Array.isArray(role)) {
    matched = role.some((item) => item == user.role);
  }

  if (user && typeof role == "string") {
    matched = role == user.role;
  }

  return [matched, user];
}

export default useRole;
