/* eslint-disable max-lines */
"use client";
import useUserCreate from "@/hooks/users/useUserCreate";
import { UserGender, UserUpdateInput } from "@/types/user";
// import { jsonForm } from '@/utils/form';
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowForward, LockOpenOutlined, LockOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
// yup.addMethod(yup.string, "stripEmptyString", function () {
//   return this.transform((value) => (value === "" ? undefined : value));
// });
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required!")
    .min(5, "Must be exactly 5 digits")
    .max(15, "Must be exactly 15 digits"),
  firstName: yup
    .string()
    .min(5, "Must be exactly 5 digits")
    .max(15, "Must be exactly 15 digits"),
  lastName: yup
    .string()
    .min(5, "Must be exactly 5 digits")
    .max(15, "Must be exactly 15 digits"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required!"),
  email: yup
    .string()
    .matches(emailRegExp, "Email is not valid")
    .required("Email is required!"),
  password: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Password is required!"),
  repeatPassword: yup
    .string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .required("Repeat password is required!")
    .oneOf([yup.ref("password"), ""], "Passwords must match"),
  gender: yup.string(),
  //   avatar: yup.mixed(),
});
export default function FormSignUp() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    // defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const t = useTranslations("SignInUp");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isPending, startTransition] = useTransition();
  const { trigger: triggerUserCreate, error, isMutating } = useUserCreate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  //   const [selectedImage, setSelectedImage] = useState<File>();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //   const handleChangeImage = (e: FormEvent<HTMLInputElement>) => {
  //     const target = e.target as HTMLInputElement;
  //     const files = target.files;
  //     if (files && files.length > 0) {
  //       setSelectedImage(files[0]);
  //     }
  //   };

  const onSubmit = (data: UserUpdateInput) => {
    triggerUserCreate({
      body: data as any,
    }).then(() => {
      reset();
      enqueueSnackbar(t("Sign up successfully"), {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      startTransition(() => {
        router.push("/sign-in");
      });
    });
  };

  return (
    <Box my={4}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="sign-up"
      >
        {isPending && (
          <LinearProgress sx={{ position: "absolute", left: 0, right: 0, top: 0 }} />
        )}

        <Grid container>
          {/* <Grid
            item
            xs={12}
            mb={3}
          >
            <Box
              display={"flex"}
              justifyContent={"left"}
              alignItems={"center"}
              columnGap={3}
            >
              <Avatar
                alt="Remy Sharp"
                src={
                  selectedImage ? URL.createObjectURL(selectedImage) : "/images/hinh1.jpg"
                }
                sx={{ width: 65, height: 65 }}
              />
              <Box>
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                >
                  <Typography variant="caption">Upload File</Typography>

                  <input
                    name="avatar"
                    type="file"
                    hidden
                    onChange={handleChangeImage}
                  />
                </Button>
                <br />
                <Typography
                  display={"inline-flex"}
                  variant="caption"
                  mr={1}
                >
                  {selectedImage ? selectedImage?.name + " /" : ""}
                </Typography>
                <Typography
                  display={"inline-flex"}
                  variant="caption"
                  color={neutral[300]}
                >
                  {selectedImage ? selectedImage?.size + " MB" : ""}
                </Typography>
              </Box>
            </Box>
          </Grid> */}
          <Grid
            item
            xs={12}
            mb={2}
          >
            <Typography
              variant="caption"
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              {t("Username")}
            </Typography>
            <br />
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  sx={{ marginTop: 1 }}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.username)}
                />
              )}
            />
            {errors.username && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.username.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid
            container
            justifyContent={"space-between"}
            columnSpacing={2}
          >
            <Grid
              item
              xs={6}
              mb={2}
            >
              <Typography
                variant="caption"
                textTransform={"uppercase"}
                fontWeight={"bold"}
              >
                {t("First name")}
              </Typography>
              <br />
              <Controller
                name="firstName"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    sx={{ marginTop: 1 }}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.firstName)}
                  />
                )}
              />
              {errors.firstName && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.firstName.message}
                </FormHelperText>
              )}
            </Grid>
            <Grid
              item
              xs={6}
              mb={2}
            >
              <Typography
                variant="caption"
                textTransform={"uppercase"}
                fontWeight={"bold"}
              >
                {t("Last name")}
              </Typography>
              <br />
              <Controller
                name="lastName"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    sx={{ marginTop: 1 }}
                    fullWidth
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.lastName)}
                  />
                )}
              />
              {errors.lastName && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.lastName.message}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            mb={2}
          >
            <Typography
              variant="caption"
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              {t("Phone number")}
            </Typography>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  sx={{ marginTop: 1 }}
                  fullWidth
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.phoneNumber)}
                />
              )}
            />
            {errors.phoneNumber && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.phoneNumber.message}
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
              textTransform={"uppercase"}
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
                  sx={{ marginTop: 1 }}
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
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              {t("What is your gender")}
            </Typography>
            <RadioGroup
              row
              name="gender"
            >
              <FormControlLabel
                value={UserGender.Female}
                control={<Radio />}
                label={t(UserGender.Female)}
              />
              <FormControlLabel
                value={UserGender.Male}
                control={<Radio />}
                label={t(UserGender.Male)}
              />
              <FormControlLabel
                value={UserGender.Other}
                control={<Radio />}
                label={t(UserGender.Other)}
              />
            </RadioGroup>
          </Grid>
          <Grid
            item
            xs={12}
            mb={2}
          >
            <Typography
              variant="caption"
              textTransform={"uppercase"}
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
                  sx={{ marginTop: 1 }}
                  fullWidth
                  name="password"
                  placeholder={t("8+ character")}
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
            <Typography
              variant="caption"
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              {t("Repeat password")}
            </Typography>
            <Controller
              name="repeatPassword"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.repeatPassword)}
                  sx={{ marginTop: 1 }}
                  fullWidth
                  name="repeatPassword"
                  placeholder={t("8+ character")}
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
            {errors.repeatPassword && (
              <FormHelperText sx={{ color: "error.main" }}>
                {errors.repeatPassword.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid
            item
            xs={12}
          >
            {error && (
              <Alert
                severity="error"
                sx={{ mt: 2 }}
              >
                [{error?.code}] {error?.message}
              </Alert>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            mb={2}
            textAlign={"end"}
          >
            <Typography
              display={"inline-flex"}
              variant="body2"
            >
              {t("Already a member")}
            </Typography>
            <Link
              href={"/vi/sign-in"}
              style={{ display: "inline-flex", textDecoration: "none" }}
            >
              <Typography
                fontWeight={"bold"}
                color="primary"
                variant="body2"
                sx={{
                  textDecoration: "underline",
                }}
              >
                {t("Sign In")}
              </Typography>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              type="submit"
              form="sign-up"
              variant="contained"
              fullWidth
              size="large"
              sx={{ boxShadow: "none", paddingY: "12px", borderRadius: 0 }}
              endIcon={
                isMutating ? (
                  <CircularProgress size={24} />
                ) : (
                  <ArrowForward sx={{ color: "white" }} />
                )
              }
              disabled={isMutating}
            >
              <Typography
                color="white"
                variant="body2"
                fontWeight={"bold"}
              >
                {t("Sign Up")}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
