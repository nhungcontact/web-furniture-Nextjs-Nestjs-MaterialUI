import { neutral } from "@/config/theme";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";
type Props = {
  phone: string;
  address: string;
}
function FooterGymDetail({phone, address}:Props) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "475px",
        width: "100%",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <Image
        alt={""}
        fill
        style={{ objectFit: "cover" }}
        src="/images/image57.png"
      />
      <Box
        sx={{
          top: "119px",
          position: "absolute",
          textAlign: "center",
          width: "100%",
        }}
      >
        <Box marginBottom="25px">
          <Typography
            variant="h4"
            color="secondary"
          >
            call us today
          </Typography>
          <Typography
            variant="h4"
            color={neutral[100]}
          >
            {phone}
          </Typography>
        </Box>
        <Box marginBottom="25px">
          <Typography
            variant="h4"
            color="secondary"
          >
            or have a visit at
          </Typography>
          <Typography
            variant="h4"
            color={neutral[100]}
          >
            {address}
          </Typography>
        </Box>
        <Link href={"/signup"}>
          <CustomButton sx={{ padding: "12px 42px" }}>Register now</CustomButton>
        </Link>
      </Box>
    </Box>
  );
}
export default FooterGymDetail;
