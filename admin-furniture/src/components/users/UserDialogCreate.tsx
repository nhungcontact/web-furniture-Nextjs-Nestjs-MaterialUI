/* eslint-disable max-lines */
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import useRoleList from "@/hooks/roles/useRoleList";
import useUserCreate from "@/hooks/users/useUserCreate";
import useUserUpdate from "@/hooks/users/useUserUpdate";
import { GetRole } from "@/types/role";
import {
  GetUser,
  UserCreateInput,
  UserGender,
  UserType,
  UserUpdateInput,
} from "@/types/user";
import { jsonForm } from "@/utils/form";
import { LockOpenOutlined, LockOutlined } from "@mui/icons-material";
import { FormEvent, useState } from "react";

type Props = {
  handleClose: () => void;
  open: boolean;
  data?: GetUser;
};
export default function UserDialogCreate({ handleClose, open, data }: Props) {
  const { data: roles } = useRoleList({});
  const { trigger: createUser } = useUserCreate();
  const { trigger: updateUser } = useUserUpdate(data ? data._id : "");
  const [valueRoles, setValueRoles] = useState<GetRole[]>(
    data && data.roles ? data.roles : [],
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  //   const [selectedImage, setSelectedImage] = useState<File>();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (valueRoles) {
      const result = valueRoles.map((item) => item._id);
      if (data) {
        console.log("update", json);
        updateUser({
          body: {
            ...json,
            userType: UserType.Personnel,
            roles: result as string[],
          } as UserUpdateInput,
        })
          .then(() => {
            console.log("success");
            handleClose();
            //   window.location.reload();
          })
          .catch((e) => {
            alert(e.message);
          });
      } else {
        createUser({
          body: {
            ...json,
            userType: UserType.Personnel,
            roles: result as string[],
          } as UserCreateInput,
        })
          .then(() => {
            console.log("success");
            handleClose();
            //   window.location.reload();
          })
          .catch((e) => {
            alert(e.message);
          });
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        scroll="paper"
      >
        <DialogTitle>
          <b>{data ? "Update" : "Create"} User (Personnel)</b>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          <form
            onSubmit={onSubmit}
            id="create-user"
          >
            <Grid container>
              <Grid
                item
                xs={12}
                my={2}
              >
                <Typography
                  variant="body1"
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  color="black"
                >
                  Username
                </Typography>

                <TextField
                  defaultValue={data?.username}
                  name="username"
                  sx={{
                    marginTop: 1,
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                  fullWidth
                />
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
                    variant="body1"
                    textTransform={"capitalize"}
                    fontWeight={"bold"}
                    color="black"
                  >
                    First name
                  </Typography>

                  <TextField
                    sx={{
                      marginTop: 1,
                      "& .MuiOutlinedInput-root": {
                        background: "#FFFFFF",
                      },
                    }}
                    fullWidth
                    name="firstName"
                    defaultValue={data?.firstName}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  mb={2}
                >
                  <Typography
                    variant="body1"
                    textTransform={"capitalize"}
                    fontWeight={"bold"}
                    color="black"
                  >
                    Last name
                  </Typography>

                  <TextField
                    sx={{
                      marginTop: 1,
                      "& .MuiOutlinedInput-root": {
                        background: "#FFFFFF",
                      },
                    }}
                    fullWidth
                    name="lastName"
                    defaultValue={data?.lastName}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  color="black"
                >
                  Phone number
                </Typography>
                <TextField
                  sx={{
                    marginTop: 1,
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                  fullWidth
                  name="phoneNumber"
                  defaultValue={data?.phoneNumber}
                />
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  color="black"
                >
                  Email address
                </Typography>

                <TextField
                  sx={{
                    marginTop: 1,
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                  fullWidth
                  name="email"
                  defaultValue={data?.email}
                />
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  color="black"
                >
                  What is your gender?
                </Typography>

                <RadioGroup
                  row
                  defaultValue={data?.gender}
                  name="gender"
                >
                  <FormControlLabel
                    value={UserGender.Female}
                    control={<Radio />}
                    label={UserGender.Female}
                  />
                  <FormControlLabel
                    value={UserGender.Male}
                    control={<Radio />}
                    label={UserGender.Male}
                  />
                  <FormControlLabel
                    value={UserGender.Other}
                    control={<Radio />}
                    label={UserGender.Other}
                  />
                </RadioGroup>
              </Grid>
              {!data && (
                <>
                  <Grid
                    item
                    xs={12}
                    mb={2}
                  >
                    <Typography
                      variant="body1"
                      textTransform={"capitalize"}
                      fontWeight={"bold"}
                      color="black"
                    >
                      Enter Password
                    </Typography>

                    <TextField
                      name="password"
                      sx={{
                        marginTop: 1,
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                      fullWidth
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
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    mb={2}
                  >
                    <Typography
                      variant="body1"
                      textTransform={"capitalize"}
                      fontWeight={"bold"}
                      color="black"
                    >
                      Repeat Password
                    </Typography>

                    <TextField
                      sx={{
                        marginTop: 1,
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                      fullWidth
                      name="repeatPassword"
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
                  </Grid>
                </>
              )}
              <Grid
                item
                xs={12}
              >
                <Typography
                  variant="body1"
                  textTransform={"capitalize"}
                  fontWeight={"bold"}
                  color="black"
                >
                  Roles
                </Typography>

                <Autocomplete
                  fullWidth
                  multiple
                  id="combo-box-demo"
                  value={valueRoles}
                  getOptionLabel={(option) => option.name}
                  options={roles && roles.items && roles.items.length ? roles.items : []}
                  onChange={(event, newValue) => {
                    setValueRoles(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        marginTop: 1,
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                    />
                  )}
                />
              </Grid>
              {/* <Grid
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
              </Grid> */}
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            size="medium"
            variant="contained"
            onClick={handleClose}
            className="btn-cancel"
          >
            Cancel
          </Button>
          <Button
            size="medium"
            variant="contained"
            type="submit"
            color="primary"
            form="create-user"
            className="btn-action"
          >
            {data ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
