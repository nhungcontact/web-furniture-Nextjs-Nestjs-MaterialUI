"use client";
import useUserInfor from "@/hooks/users/useUserInfor";
import { Box, Container, Divider, Typography } from "@mui/material";
import Link from "next/link";
import CartTable from "./CartTable";
import CartTableNoUser from "./cart-no-user/CartTableNoUser";

export default function Cart() {
  const { data: user } = useUserInfor();

  return (
    <>
      <Divider />
      <br />
      <Container maxWidth="xl">
        {!user && (
          <Box
            sx={{
              border: "1px solid #c9c2c2",
              backgroundColor: "#fff",
              padding: "20px 10px 20px 10px",
              marginBottom: "20px",
            }}
          >
            <Link
              style={{
                display: "inline-flex",
              }}
              href="/sign-in"
            >
              <Typography variant="caption">Sign-in or Create an Account</Typography>
            </Link>{" "}
            <Typography variant="caption">
              to earn rewards, track your order history and save your information for
              faster checkout.
            </Typography>
          </Box>
        )}

        <Typography
          variant="h2"
          textTransform="uppercase"
          fontFamily={"serif"}
          fontWeight={"400"}
        >
          Shopping Cart
        </Typography>
        <CartTableNoUser user={user} />
      </Container>
    </>
  );
}
