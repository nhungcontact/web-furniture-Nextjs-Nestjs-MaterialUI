"use client";
import useBillSalesPerformancePercentage from "@/hooks/bills/useBillSalesPerformancePercentage";
import { MoreVert } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Fade,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import DatesOverview from "./DatesOverview";
import MonthlyOverview from "./MonthlyOverview";
import WeeklyOverview from "./WeeklyOverview";
// import { isValidRole } from "@/helpers/isValidRole";

export default function Overview() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState<string>("Dates");
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (value: string) => {
    setValue(value);
    handleClose();
  };
  const { data: sales } = useBillSalesPerformancePercentage(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
  );

  const router = useRouter();

  //   const { data: user } = useUserInfor();
  //   const [permissionList, setUniquePermissions] = useState<Permission[]>([]);

  //   useEffect(() => {
  //     if (user && user.roles) {
  //       const mergedPermissions = Array.from(
  //         new Set(user.roles.flatMap((role) => role.permissions)),
  //       );
  //       setUniquePermissions(mergedPermissions);
  //     }
  //   }, [user]);
  //   console.log(isValidRole({ permissionList, role: "CreateRole" }));
  return (
    <Card>
      <CardHeader
        title={`${value} Overview`}
        titleTypographyProps={{
          sx: { lineHeight: "2rem !important", letterSpacing: "0.15px !important" },
        }}
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            // onClick={()=>handleView("weekly")}
          >
            <MoreVert />
          </IconButton>
        }
      />
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("Dates")}
          selected={value === "Dates"}
        >
          Dates between
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Weekly")}
          selected={value === "Weekly"}
        >
          Weekly
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Monthly")}
          selected={value === "Monthly"}
        >
          Monthly
        </MenuItem>
        {/* <MenuItem
          onClick={() => handleMenuItemClick("Yearly")}
          selected={value === "Yearly"}
        >
          Yearly
        </MenuItem> */}
      </Menu>
      <CardContent sx={{ "& .apexcharts-xcrosshairs.apexcharts-active": { opacity: 0 } }}>
        {value === "Dates" && <DatesOverview />}
        {value === "Weekly" && <WeeklyOverview />}
        {value === "Monthly" && <MonthlyOverview />}
        {/* <Box sx={{ mb: 7, display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{ mr: 4 }}
          >
            {sales ? sales.toFixed(2) : 0}%
          </Typography>
          <Typography variant="body1">
            Your sales performance is {sales ? sales.toFixed(2) : 0}% 😎 better compared
            to last month
          </Typography>
        </Box> */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => router.push("/bills")}
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );
}
