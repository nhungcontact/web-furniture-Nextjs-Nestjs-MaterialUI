"use client";
import React from "react";
import Heading from "./Heading";
import BodyText from "./BodyText";
import SearchBox from "../shared/SearchBox";
import HeroBanner from "./HeroBanner";
import CustomButton from "../shared/CustomButton";
import { Box, Container, Grid, Stack } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { theme } from "@/config/theme";
import Advertise from "./Advertise";
import { useRouter } from "next/navigation";
import useRole from "@/hooks/shared/useRole";
import { UserRole } from "@/types/user";
export default function HeroSection() {
  const router = useRouter();
  const [inputText, setInputText] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(event.target.value);
  };
  const handleSearch = () => {
    if (inputText) {
      router.push(`/result?search=${inputText}`);
    }
  };
  const [matched_owner] = useRole(UserRole.FACILITY_OWNER)
  const [matched_admin] = useRole(UserRole.ADMIN)
  return (
    <Container
      maxWidth={false}
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <Grid container>
        <Grid
          item
          md={6}
        >
          <Stack
            direction="column"
            sx={{ position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                left: "48px",
                top: "180px",
                [theme.breakpoints.down("md")]: {
                  left: "25px",
                  top: "105px",
                  width: "300px",
                },
                [theme.breakpoints.between("sm", "md")]: {
                  left: "0px",
                  top: "150px",
                  width: "45rem",
                  textAlign: "center",
                },
              }}
            >
              <Heading />
            </Box>
            <BodyText
              sx={{
                color: "neutral.light",
                position: "absolute",
                width: "570px",
                height: "48px",
                left: "48px",
                top: "396px",
                [theme.breakpoints.down("md")]: {
                  width: "350px",
                  height: "90px",
                  left: "0",
                  top: "475px",
                  lineHeight: "25px",
                },
                [theme.breakpoints.between("sm", "md")]: {
                  width: "45rem",
                  height: "20rem",
                  left: "0px",
                  top: "400px",
                  lineHeight: "80px",
                  fontSize: "2.5rem",
                  textAlign: "center",
                },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                [theme.breakpoints.down("md")]: {
                  left: "0px",
                  top: "575px",
                  height: "48px",
                },
                [theme.breakpoints.between("sm", "md")]: {
                  left: "0px",
                  top: "850px",
                  height: "48px",
                },
              }}
            >
              {matched_owner || matched_admin ? <></> : (
                <>
                  <SearchBox
                    value={inputText}
                    onChange={handleChange}
                    sx={{
                      [theme.breakpoints.up("md")]: {
                        position: "absolute",
                        left: "50px",
                        top: "503px",
                        padding: "12px 16px",
                      },
                      [theme.breakpoints.down("md")]: {
                        width: "265px",
                      },
                      [theme.breakpoints.between("sm", "md")]: {
                        width: "520px",
                      },
                      height: "48px",
                      width: "358px",
                    }}
                    placeholder="Enter your city or club name..."
                  />
                  <CustomButton
                    onClick={handleSearch}
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      position: "absolute",
                      left: "422px",
                      top: "502px",
                      width: "200px",
                      height: "48px",
                      [theme.breakpoints.down("md")]: {
                        left: "270px",
                        top: "0px",
                        width: "80px",
                        height: "48px",
                      },
                      [theme.breakpoints.between("sm", "md")]: {
                        left: "540px",
                        top: "0px",
                        width: "180px",
                        height: "48px",
                      },
                    }}
                  >
                    Find
                  </CustomButton>
                </>
              )}
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          md={6}
        >
          <Box
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          >
            <HeroBanner />
          </Box>
          <Advertise />
        </Grid>
      </Grid>
    </Container>
  );
}