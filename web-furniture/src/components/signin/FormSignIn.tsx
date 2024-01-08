/* eslint-disable max-lines */
"use client";
import useCartAddCartItemToCart from "@/hooks/carts/useCartAddCartItemToCart";
import useUserInfor from "@/hooks/users/useUserInfor";
import { CartItemUpdateInput } from "@/types/cart-item";
// import { jsonForm } from '@/utils/form';
import { UserSignIn } from "@/types/user";
import getCart from "@/utils/getCart";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowForward,
  CheckCircleOutline,
  CircleOutlined,
  LockOpenOutlined,
  LockOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegExp, "Email is not valid")
    .required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Password is required!"),
});
export default function FormSignIn() {
  const { enqueueSnackbar } = useSnackbar();
  const t = useTranslations("SignInUp");

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    // defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const { data: user } = useUserInfor();
  const { trigger: addCartItem } = useCartAddCartItemToCart(user ? user._id : "");

  const [errSignIn, setErrSignIn] = useState("");
  // const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleAddCart = () => {
    const data = getCart();
    if (data) {
      if (!!data && !!data.detailCarts && !!data.detailCarts.length && !!user) {
        const result = data.detailCarts.reduce((value, current) => {
          return value.concat({
            productSku: current.productSku._id,
            quantity: current.quantity,
          });
        }, [] as CartItemUpdateInput[]);
        addCartItem({
          body: {
            totalPrice: data.totalPrice,
            detailCarts: result,
            user: user._id,
          },
        })
          .then(() => {
            enqueueSnackbar(t("Sign in successfully"), {
              variant: "success",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
            router.push("/");
          })
          .catch((e) => {
            console.log(e?.message);
          });
      }
    }
  };
  const onSubmit = async (data: UserSignIn) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
      //   callbackUrl: "/"
    });
    if (res?.ok && !res.error) {
      if (user) {
        handleAddCart();
      }
    } else if (res?.error) {
      setErrSignIn(res?.error);
    }
  };
  //   const handleSubmitGoogle = () => {
  //     signIn("google", { callbackUrl: "http://localhost:3001" });
  //   };
  return (
    <Box my={4}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="sign-in"
      >
        <Grid container>
          {/* <Grid container mb={3} justifyContent={"space-between"} alignItems={"center"}>
            <Grid item xs={5}>
                <Button 
                  onClick={handleSubmitGoogle}
                  variant='outlined' 
                  fullWidth 
                  size="large" 
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    color: `${neutral[400]}`, 
                    borderRadius: 3, 
                    paddingY: "10px", 
                    border: `1px solid ${neutral[200]}`, 
                    ':hover': { 
                      border: `1px solid ${neutral[300]}`, 
                      bgcolor: `hsl(210,8%,97.5%)` 
                    }, 
                    ':active': { 
                      bgcolor: "hsl(210,8%,95%)"
                      }
                  }} 
                  startIcon={<Image src="/images/icon-google.png" height={25} width={25} alt="google"/>}
                >
                  <Typography color={neutral[400]} textTransform={"none"} variant="caption" fontWeight={"bold"}>Sign in with Google</Typography>
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={() => signIn()} variant='contained' fullWidth size="large" sx={{borderRadius: 3, paddingY: "10px", bgcolor: "#385499", ':hover': { bgcolor: "#314a86" }}} startIcon={<Facebook sx={{height:"25px", width: "25px", color: `white`}} />}>
                  <Typography color={neutral[50]} textTransform={"none"} variant="caption">Sign in with Facebook</Typography>
                </Button>
            </Grid>
          </Grid> */}
          {/* <Grid
            item
            xs={12}
            mb={2}
          >
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid
                item
                xs={5}
              >
                <Box
                  sx={{
                    height: "1px",
                    background: `${neutral[200]}`,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={1}
                textAlign={"center"}
              >
                <Typography
                  variant="caption"
                  fontWeight={"bold"}
                >
                  or
                </Typography>
              </Grid>
              <Grid
                item
                xs={5}
              >
                <Box
                  sx={{
                    height: "1px",
                    background: `${neutral[200]}`,
                  }}
                />
              </Grid>
            </Grid>
          </Grid> */}
          <Grid
            item
            xs={12}
            mb={2}
          >
            <Typography
              variant="caption"
              textTransform={"capitalize"}
              fontWeight={"bold"}
            >
              {t("Email address")}
            </Typography>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  sx={{ marginTop: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.email.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            mb={2}
          >
            <Typography
              variant="caption"
              textTransform={"capitalize"}
              fontWeight={"bold"}
            >
              {t("Password")}
            </Typography>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.password)}
                  sx={{ marginTop: 1, "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
                  fullWidth
                  name="password"
                  placeholder="8+ character"
                  required
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={handleShowPassword}
                      >
                        {showPassword ? (
                          <LockOpenOutlined cursor={"pointer"} />
                        ) : (
                          <LockOutlined cursor={"pointer"} />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {errors.password && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.password.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            mb={2}
          >
            {errSignIn && (
              <FormHelperText sx={{ color: "error.main" }}>{errSignIn}</FormHelperText>
            )}
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid
                item
                xs={4}
                textAlign={"left"}
              >
                <Checkbox
                  icon={<CircleOutlined />}
                  checkedIcon={<CheckCircleOutline />}
                  sx={{ padding: "0px" }}
                />{" "}
                <Typography
                  variant="caption"
                  fontWeight={"bold"}
                >
                  {t("Remember me")}
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                textAlign={"right"}
              >
                <Typography
                  variant="caption"
                  fontWeight={"bold"}
                  sx={{
                    background:
                      "-webkit-linear-gradient(10deg, rgba(43,74,65,1) 61%, rgba(231,177,10,1) 97%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("Forget my password")}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            mt={2}
          >
            <Button
              type="submit"
              form="sign-in"
              variant="contained"
              fullWidth
              sx={{ boxShadow: "none", paddingY: "12px", borderRadius: 3 }}
              endIcon={<ArrowForward sx={{ color: "white" }} />}
            >
              <Typography
                color="white"
                variant="caption"
                fontWeight={"bold"}
              >
                {t("Sign In")}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
