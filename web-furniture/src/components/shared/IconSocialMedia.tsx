import { Box, Stack } from "@mui/material";
import Image from "next/image";

function IconSocialMedia() {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={"18rem"}
      mt={"1rem"}
    >
      <Box sx={{ cursor: "pointer" }}>
        <Box
          width={52}
          height={52}
          position={"relative"}
          borderRadius={"50%"}
          bgcolor={"white"}
        >
          <Image
            src={"/images/icon-facebook.png"}
            alt={""}
            width={32}
            height={32}
            style={{ position: "absolute", top: "20%", left: "20%", zIndex: "1" }}
          />
        </Box>
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <Box
          width={52}
          height={52}
          position={"relative"}
          borderRadius={"50%"}
          bgcolor={"white"}
        >
          <Image
            src={"/images/icon-google.png"}
            alt={""}
            width={32}
            height={32}
            style={{ position: "absolute", top: "20%", left: "20%", zIndex: "1" }}
          />
        </Box>
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <Box
          width={52}
          height={52}
          position={"relative"}
          borderRadius={"50%"}
          bgcolor={"white"}
        >
          <Image
            src={"/images/icon-tiktok.png"}
            alt={""}
            width={32}
            height={32}
            style={{ position: "absolute", top: "20%", left: "20%", zIndex: "1" }}
          />
        </Box>
      </Box>
    </Stack>
  );
}
export default IconSocialMedia;
