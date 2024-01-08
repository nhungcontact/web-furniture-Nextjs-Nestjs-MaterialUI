// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import Account from "@/components/account/Account";
import React from "react";

async function AccountPage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return <Account />;
}

export default AccountPage;
