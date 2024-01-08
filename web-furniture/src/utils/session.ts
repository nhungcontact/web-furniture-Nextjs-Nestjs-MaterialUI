import "server-only";
import authOptions from "@/config/auth";
import { User } from "@/types/user";
import { getServerSession } from "next-auth";

export type AssertRoleOptions = {
  /** Either directly throwing an error or just return the result */
  returnResult?: boolean;
  /** Custom error message when the current user is not matched required roles */
  unmatchedMessage?: string;
  /** Custom error message when no user found (not logged in yet) */
  noUserMessage?: string;
};

/**
 * `SERVER ONLY`
 *
 * Check if current user matched the roles, if not, throw error,
 *
 * Set `allowFail = true` to return `[isMatched, currentUser]` instead of throwing error
 *
 * `role` can be single role or array of roles, `role=undefined` will allow any roles.
 * */
export async function assertRole(
  role?: "" | [],
  { returnResult, unmatchedMessage, noUserMessage }: AssertRoleOptions = {},
): Promise<[boolean, User | undefined]> {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  let matched = false;

  if (!user && !returnResult) {
    throw new Error(noUserMessage || `Forbidden: Restricted to [${role}] only.`);
  }

  if (!role) {
    return [!!user, user];
  }

  if (user && Array.isArray(role)) {
    matched = role.some((item) => item == user.roles);
  }

  if (user && typeof role == "string") {
    matched = role == user.roles;
  }

  if (!matched && !returnResult) {
    throw new Error(unmatchedMessage || `Forbidden: Restricted to [${role}] only.`);
  }

  return [matched, user];
}
