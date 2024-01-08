/* eslint-disable max-lines */
import useUserLogin from "@/hooks/users/useUserLogin";
import { UserSignIn } from "@/types/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockOpenOutlined, LockOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import FooterIllustrationsV1 from "./Footer";

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

// const Card = styled(MuiCard)(({ theme }) => ({
//   [theme.breakpoints.up("sm")]: { width: "28rem" },
// }));

// const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
//   "& .MuiFormControlLabel-label": {
//     fontSize: "0.875rem",
//     color: theme.palette.text.secondary,
//   },
// }));
export default function Login() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    // defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { trigger: login } = useUserLogin();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: UserSignIn) => {
    login({
      body: data,
    })
      .then((res) => {
        if (res) {
          localStorage.getItem("user");
          localStorage.setItem("user", JSON.stringify(res));
        }
        enqueueSnackbar("Login successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        router.push("/");
      })
      .catch((e) => {
        enqueueSnackbar(e?.message, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        // padding: 5,
      }}
    >
      <Card sx={{ zIndex: 1, p: 3 }}>
        <CardContent>
          <Box
            sx={{
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              src="/images/logo-header.png"
              height={50}
              width={50}
              alt="logo"
            />
            <Typography
              variant="h6"
              color="primary.dark"
              sx={{
                ml: 1,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "1.5rem !important",
              }}
            >
              Management Furnit
            </Typography>
          </Box>{" "}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Welcome to Furnit! 👋🏻
            </Typography>
            <Typography variant="body1">
              Please sign-in to your account and start the adventure
            </Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            id="sign-in"
          >
            <Box>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label="Email"
                    sx={{ marginY: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    fullWidth
                    autoFocus
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
            </Box>
            <Box>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    label="Password"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.password)}
                    sx={{ marginY: 2, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    fullWidth
                    name="password"
                    placeholder="8+ character"
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
            </Box>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Remember Me"
              />
              <Link
                passHref
                href="/"
              >
                <Typography
                  variant="body1"
                  color="primary"
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ mb: 2 }}
              type="submit"
              form="sign-in"
            >
              Login
            </Button>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{ marginRight: 2 }}
              >
                New on our platform?
              </Typography>
              <Link
                passHref
                href="/pages/register"
                style={{
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="body1"
                  color="primary"
                >
                  Create an account
                </Typography>
              </Link>
            </Box> */}
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
}
