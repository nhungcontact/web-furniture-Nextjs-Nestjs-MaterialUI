import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Button, Slide, Typography } from "@mui/material";
import { secondary } from "@/config/theme";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BasicBreadcrumbs from "./BasicBreadcrumbs";
type Banner = {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  isButton: boolean;
  isBreadcrumbs: boolean;
};
type Props = {
  banner: Banner;
  heightBanner: number;
};
export default function BannerCard({ banner, heightBanner }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Box
      position={"relative"}
      height={heightBanner}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        position="absolute"
        bottom="50px"
        right="200px"
      >
        <Slide
          direction="left"
          in={mounted}
          mountOnEnter
          timeout={400}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            width={400}
            height={400}
          />
        </Slide>
      </Box>
      <Box
        position={"absolute"}
        sx={{ bottom: "200px", left: "200px" }}
        width={500}
      >
        <Slide
          direction="down"
          in={mounted}
          mountOnEnter
          timeout={400}
        >
          <Typography
            variant="h2"
            marginBottom={2}
          >
            {banner.title}
          </Typography>
        </Slide>
        <Slide
          direction="down"
          in={mounted}
          mountOnEnter
          timeout={400}
        >
          <Typography
            variant="body1"
            textTransform={"capitalize"}
            marginBottom={2}
          >
            {banner.description}
          </Typography>
        </Slide>
        <Slide
          direction="up"
          in={mounted}
          mountOnEnter
          timeout={400}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              color: "white",
              padding: "10px 30px",
              "& .MuiSvgIcon-root": {
                color: `${secondary[400]}`,
              },
              display: banner.isButton ? "inline-flex" : "none",
            }}
            endIcon={<KeyboardArrowRightIcon />}
          >
            <Typography
              variant="body1"
              textTransform={"capitalize"}
            >
              Show now
            </Typography>
          </Button>
        </Slide>
        <Slide
          direction="up"
          in={mounted}
          mountOnEnter
          timeout={400}
        >
          <Box display={banner.isBreadcrumbs ? "block" : "none"}>
            {/* <BasicBreadcrumbs /> */}
          </Box>
        </Slide>
      </Box>
    </Box>
  );
}
