import { AcUnit } from "@mui/icons-material";
import { SvgIcon, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
function Logo() {
  const router = useRouter();
  return (
    <>
      <SvgIcon
        color="primary"
        onClick={() => router.push("/")}
        fontSize="large"
      >
        <AcUnit />
      </SvgIcon>
      <Typography
        variant="h5"
        ml={2}
        onClick={() => router.push("/")}
        fontWeight="bold"
      >
        Furnit Management
      </Typography>
    </>
  );
}
export default Logo;
