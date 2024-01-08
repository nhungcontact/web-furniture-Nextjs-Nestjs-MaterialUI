import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Box, Button, Container, Slide, Typography } from "@mui/material";
import { primary, secondary } from "@/config/theme";
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
  bottomImage: number;
  bottomTitle: number;
};
export default function BannerCardXS({
  banner,
  heightBanner,
  bottomImage,
  bottomTitle,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  return (
    <Box
      position={"relative"}
      bgcolor={"#F1F1F1"}
      height={heightBanner}
    >
      <Box
        position="absolute"
        bottom={bottomImage}
        right="0px"
        textAlign={"center"}
        width={"100%"}
      >
        <Slide
          direction="down"
          in={mounted}
          mountOnEnter
          timeout={400}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            width={220}
            height={220}
          />
        </Slide>
      </Box>
      <Box
        position={"absolute"}
        bottom={bottomTitle}
        left={0}
        sx={{ width: "100%", textAlign: "center" }}
        width={200}
      >
        <Container maxWidth="lg">
          <Slide
            direction="up"
            in={mounted}
            mountOnEnter
            timeout={400}
          >
            <Typography
              variant="h3"
              marginBottom={2}
            >
              {banner.title}
            </Typography>
          </Slide>
          <Slide
            direction="up"
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
                padding: "8px 20px",
                "& .MuiSvgIcon-root": {
                  color: `${secondary[400]}`,
                },
                display: banner.isButton ? "inline-flex" : "none",
              }}
              endIcon={<KeyboardArrowRightIcon />}
            >
              <Typography
                variant="caption"
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
        </Container>
      </Box>
    </Box>
  );
}
