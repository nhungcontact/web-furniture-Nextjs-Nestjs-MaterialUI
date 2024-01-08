import React from "react";
import { Box, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import { LogoMain } from "@/components/shared/LogoMain";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import useRoomFurnitureList from "@/hooks/room-furnitures/useRoomFurnitureList";
import { RoomFurnitureStatus } from "@/types/room-furniture";
import { useTranslations } from "next-intl";
import { useMainMenu } from "@/config/navigation";

export default function FooterLayout() {
  const t = useTranslations("MainPage");
  const { data: rooms } = useRoomFurnitureList();
  const pages = useMainMenu();
  return (
    <>
      <Box sx={{ backgroundColor: "#F4F4F4" }}>
        <Container
          maxWidth={"lg"}
          sx={{ paddingY: "60px" }}
        >
          <Grid
            container
            columnSpacing={12}
            rowSpacing={6}
            alignItems={"start"}
            justifyContent={"space-between"}
          >
            <Grid
              item
              xs={6}
              md={2}
              display={{ xs: "none", md: "block" }}
            >
              <LogoMain />
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
            >
              <Typography
                marginLeft={1}
                marginBottom={2}
                variant="h6"
                color={"black"}
                fontWeight={"600"}
                textTransform={"uppercase"}
              >
                About
              </Typography>
              {pages.map((page, index) => (
                <Link
                  key={index}
                  href={page.path}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="body1"
                    textTransform={"capitalize"}
                    sx={{
                      m: 1,
                      color: `black`,
                      display: "block",
                    }}
                  >
                    {page.label}
                  </Typography>
                </Link>
              ))}
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
            >
              <Typography
                marginLeft={1}
                marginBottom={2}
                variant="h6"
                color={"black"}
                fontWeight={"600"}
                textTransform={"uppercase"}
              >
                Room
              </Typography>
              {rooms &&
                rooms.items &&
                rooms.items.map((room, index) => {
                  if (room.status === RoomFurnitureStatus.ACTIVE) {
                    return (
                      <Link
                        key={index}
                        href={"/furniture"}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          variant="body1"
                          textTransform={"capitalize"}
                          sx={{
                            m: 1,
                            color: `black`,
                            display: "block",
                          }}
                        >
                          {room.name}
                        </Typography>
                      </Link>
                    );
                  }
                })}
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
            >
              <Typography
                marginLeft={1}
                marginBottom={2}
                variant="h6"
                color={"black"}
                fontWeight={"600"}
                textTransform={"uppercase"}
              >
                Sale
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
            >
              <Typography
                marginLeft={1}
                marginBottom={2}
                variant="h6"
                color={"black"}
                fontWeight={"600"}
                textTransform={"uppercase"}
              >
                Blog
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Divider />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        m={2}
      >
        <Typography>© {t("Copyright")} 2023</Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="body1"
            color={"black"}
            fontWeight={"600"}
            marginRight={"10px"}
          >
            {t("Contact with us")}
          </Typography>
          <Box>
            <IconButton
              sx={{ "& .MuiSvgIcon-root": { color: `black`, fontSize: "22px" } }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              sx={{ "& .MuiSvgIcon-root": { color: `black`, fontSize: "22px" } }}
            >
              <FacebookOutlinedIcon />
            </IconButton>
            <IconButton
              sx={{ "& .MuiSvgIcon-root": { color: `black`, fontSize: "22px" } }}
            >
              <InstagramIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}
