"use client";

import useUserInfor from "@/hooks/users/useUserInfor";
import { Box, Divider, Grid } from "@mui/material";
import { useState } from "react";
import AccountContentInfo from "./AccountContentInfor";
import AccountSideBar from "./AccountSideBar";
import AccountOrderHistory from "./order-history/AccountOrderHistory";

export default function Account() {
  const { data: user } = useUserInfor();

  const [value, setValue] = useState("Information");

  const handleGetValue = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ background: "#F8F8F8", height: "100%" }}>
      <Divider />

      <Box
        paddingY={2}
        paddingX={4}
      >
        {/* <Typography
          variant="h3"
          textTransform="uppercase"
          fontFamily={"serif"}
          fontWeight={"400"}
          //   textAlign="center"
          mb={2}
        >
          My Account
        </Typography> */}
        <Grid container>
          <Grid
            item
            xs={2}
          >
            <AccountSideBar getValue={handleGetValue} />
          </Grid>
          <Grid
            item
            xs={10}
          >
            {value === "Information" && user && <AccountContentInfo user={user} />}
            {value === "OrderHistory" && user && <AccountOrderHistory user={user} />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
