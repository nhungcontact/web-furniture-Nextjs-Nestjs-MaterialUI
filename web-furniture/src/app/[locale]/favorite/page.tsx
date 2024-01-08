// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import FavoriteList from "@/components/favorite/FavoriteList";
import { Favorite } from "@mui/icons-material";
import { Divider } from "@mui/material";
import React from "react";

async function FavoritePage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return (
    <>
      <Divider />
      <FavoriteList />
    </>
  );
}

export default FavoritePage;
