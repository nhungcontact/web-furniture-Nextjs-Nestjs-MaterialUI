// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import Search from "@/components/search/Search";
import { Divider } from "@mui/material";
import React from "react";

async function SearchPage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return (
    <>
      <Divider />
      <Search />
    </>
  );
}

export default SearchPage;
