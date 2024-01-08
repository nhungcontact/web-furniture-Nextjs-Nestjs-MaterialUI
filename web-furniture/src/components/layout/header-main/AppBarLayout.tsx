/* eslint-disable max-lines */
import { LogoMain } from "@/components/shared/LogoMain";
import { primary, secondary } from "@/config/theme";
import { Button, Container, Divider, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import { useSession } from "next-auth/react";
import { useMainMenu } from "@/config/navigation";
import useUserInfor from "@/hooks/users/useUserInfor";
import getCart from "@/utils/getCart";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AccountUser from "./AccountUser";
import DropdownSetting from "./DropdownSetting";
import SearchLayout from "./SearchLayout";
type Props = {
  locale: string;
};
function AppBarLayout({ locale }: Props) {
  const pages = useMainMenu();
  const t = useTranslations("MainPage");
  const router = useRouter();
  const pathName = usePathname();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const { data: dataUser } = useUserInfor();
  const { data: user } = useUserInfor();

  useEffect(() => {
    const cart = getCart();
    if (cart) {
      let totalQuantity = 0;
      for (const val of cart.detailCarts) {
        totalQuantity += val.quantity;
      }
      setTotalQuantity(totalQuantity);
    }
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position={"relative"}
        sx={{ background: "none", boxShadow: "none" }}
      >
        <Container
          maxWidth="xl"
          sx={{ paddingY: 1 }}
        >
          <Toolbar>
            <Link
              href={"/"}
              style={{ textDecoration: "none", color: "black", width: "430px" }}
            >
              <LogoMain />
            </Link>
            <SearchLayout />
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box
              sx={{ "& .MuiSvgIcon-root": { color: `black` } }}
              display={{ xs: "none", md: "block" }}
            >
              {dataUser ? (
                <AccountUser data={dataUser} />
              ) : (
                <Button
                  sx={{
                    borderRadius: 0,
                    mr: 1,
                    alignItems: "end",
                  }}
                  aria-label="sign in"
                  onClick={() => router.push("/sign-in")}
                >
                  <Image
                    src="/images/user.png"
                    width={20}
                    height={20}
                    alt="heart"
                  />
                  <Typography
                    variant="caption"
                    textTransform={"uppercase"}
                    sx={{
                      mx: 1,
                      color: `black`,
                      display: "block",
                      // fontWeight:"bold"
                    }}
                  >
                    {t("Sign In")}
                  </Typography>
                </Button>
              )}
              <IconButton
                sx={{
                  borderRadius: 0,
                  mr: 1,
                  alignItems: "end",
                }}
                aria-label="menu"
                onClick={() => router.push("/favorite")}
              >
                <Image
                  src="/images/heart.png"
                  width={20}
                  height={20}
                  alt="heart"
                />
                <Typography
                  variant="caption"
                  textTransform={"uppercase"}
                  sx={{
                    mx: 1,
                    color: `black`,
                    display: "block",
                  }}
                >
                  {t("Favorites")}
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={"bold"}
                  color={primary[400]}
                >
                  ({user?.products?.length ?? 0})
                </Typography>
              </IconButton>
              <IconButton
                onClick={() => router.push("/cart")}
                sx={{
                  borderRadius: 0,
                  mr: 1,
                  alignItems: "end",
                }}
                aria-label="menu"
              >
                <Image
                  src="/images/cart.png"
                  width={20}
                  height={20}
                  alt="heart"
                />
                <Typography
                  variant="caption"
                  textTransform={"uppercase"}
                  sx={{
                    mx: 1,
                    color: `black`,
                    display: "block",
                  }}
                >
                  {t("Cart")}
                </Typography>
                <Typography
                  variant="caption"
                  fontWeight={"bold"}
                  color={primary[400]}
                >
                  (
                  {getCart().detailCarts.reduce((sum, cart) => sum + cart.quantity, 0) ??
                    0}
                  )
                </Typography>
              </IconButton>
              <DropdownSetting />
            </Box>
          </Toolbar>
        </Container>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {pages.map((page, index) => (
            <Link
              key={index}
              href={page.path}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="h5"
                textTransform={"uppercase"}
                sx={{
                  my: 2,
                  mx: 4,
                  color:
                    pathName ===
                    (locale === "vi"
                      ? page.path
                      : page.path === "/"
                      ? page.path + `en`
                      : `/en` + page.path)
                      ? `${secondary[400]}`
                      : `black`,
                  textDecoration:
                    pathName ===
                    (locale === "vi"
                      ? page.path
                      : page.path === "/"
                      ? page.path + `en`
                      : `/en` + page.path)
                      ? "underline"
                      : "none",
                  display: "block",
                  fontWeight: "bold",
                  ":hover": {
                    color: `${secondary[400]}`,
                    textDecoration: "underline",
                  },
                }}
              >
                {page.label}
              </Typography>
            </Link>
          ))}
        </Box>
      </AppBar>
    </Box>
  );
}
export default AppBarLayout;
