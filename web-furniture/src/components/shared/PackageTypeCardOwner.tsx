import React, { useState } from "react";
import { Grid, Typography, Card, Box, CardContent } from "@mui/material";
import { neutral } from "@/config/theme";
import Link from "next/link";
import { PackageTypeCreate } from "@/types/package-type";

type Props = {
  packageType: PackageTypeCreate;
};

export default function PackageTypeCardOwner({ packageType }: Props) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  console.log("PACKAGE TYPE CARD", packageType);
  return (
    <Link
      href={`/vi/owner/manage/create-package/add/${packageType._id}`}
      style={{ textDecoration: "none" }}
    >
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
        sx={{ backgroundColor: "black", padding: "10px" }}
      >
        <Card
          sx={{
            display: "flex",
            backgroundColor: isHover ? `${neutral[50]}` : "#000000",
            width: "100%",
            height: "100%",
            padding: "16px 24px",
            justifyContent: "space-between",
            transition: "all .35s",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <CardContent sx={{ width: "360px", padding: "0px" }}>
              <Box sx={{ paddingBottom: "16px" }}>
                <Typography
                  variant="h4"
                  sx={{ color: isHover ? "#000000" : "#FFFFFF" }}
                >
                  {packageType.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="neutral.light"
                >
                  {packageType.description}
                </Typography>
                <Typography
                  variant="body1"
                  color="neutral.light"
                >
                  {packageType.price}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </Link>
  );
}
