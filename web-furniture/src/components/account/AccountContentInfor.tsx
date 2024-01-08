/* eslint-disable max-lines */
import { neutral, primary } from "@/config/theme";
import { GetUser, UserGender, UserType, UserUpdateInput } from "@/types/user";
import stringAvatar from "@/utils/getName";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import InforAddress from "./address/InforAddress";
import { Address } from "@/types/address";
import { Add } from "@mui/icons-material";
import { jsonForm } from "@/utils/form";
import useUserUpdate from "@/hooks/users/useUserUpdate";
type Props = {
  user: GetUser;
};
const initialAddress: Address = {
  province: "",
  district: "",
  commune: "",
  addressDetail: "",
  isDefault: false,
};
export default function AccountContentInfo({ user }: Props) {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [appendList, setAppendList] = useState<Address[]>(
    user.address ? user.address : [],
  );
  const [selectedImage, setSelectedImage] = useState<File>();
  const [gender, setGender] = useState<UserGender>(
    user ? (user.gender as UserGender) : UserGender.Female,
  );
  const { trigger: updateUser } = useUserUpdate(user._id);

  const handleAddAddress = () => {
    if (appendList && appendList.length < 4) {
      setAppendList([...appendList, initialAddress]);
    } else {
      alert("Maximum 4 addresses");
    }
  };

  const handleRemoveAddress = (val: number) => {
    if (appendList) {
      const removeData = appendList.filter((_, index) => index !== val);
      setAppendList(removeData);
    }
  };

  const handleInputChange = (value: string, name: string, index: number) => {
    if (appendList) {
      const updatedData = [...appendList];
      updatedData[index] = { ...updatedData[index], [name]: value };
      setAppendList(updatedData);
    }
  };

  const handleChangeGender = (event: SelectChangeEvent<UserGender>) => {
    setGender(event.target.value as UserGender);
    // getValueType(event.target.value as PromotionType);
  };

  const handleChangeImage = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };
  const handleUpdateUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);

    console.log({
      firstName: json.firstName as string,
      lastName: json.lastName as string,
      gender: json.gender as UserGender,
      address: appendList,
    });
    if (isUpdate) {
      updateUser({
        body: {
          firstName: json.firstName as string,
          lastName: json.lastName as string,
          gender: json.gender as UserGender,
          address: appendList,
        } as UserUpdateInput,
      })
        .then(() => {
          alert("OK");
          //   window.location.reload();
        })
        .catch((e) => {
          alert(e.message);
        });
    } else {
      setIsUpdate(!isUpdate);
    }
  };
  useEffect(() => {
    if (!!user && !!user.address && !!user.address.length) {
      setAppendList(user.address);
    }
  }, [user]);
  return (
    <Card sx={{ borderRadius: 0 }}>
      <Container sx={{ py: 2 }}>
        <Typography
          variant="body2"
          fontWeight={"600"}
          marginBottom={4}
        >
          Accounts Informarion
        </Typography>

        <Box
          display={"flex"}
          justifyContent={"left"}
          alignItems={"start"}
          columnGap={3}
          marginY={2}
        >
          <Box>
            <Avatar
              {...stringAvatar(
                user ? user.firstName + " " + user.lastName : "Tim Neutkens",
              )}
              sx={{ height: 80, width: 80, bgcolor: primary[400], margin: "auto" }}
            />
            <Typography
              variant="caption"
              mr={1}
            >
              {user.avatar ? user.avatar.name : ""}
              {selectedImage ? selectedImage?.name + " /" : ""}
            </Typography>
            {selectedImage && (
              <Typography
                variant="caption"
                color={neutral[300]}
              >
                {selectedImage?.size + " MB"}
              </Typography>
            )}
          </Box>

          <Box>
            <Typography fontWeight="bold">
              {user ? user.firstName + " " + user.lastName : "-"}
            </Typography>
            <Typography variant="caption">
              <b>Username:</b> {user.username ?? "-"}
            </Typography>
            <br />
            <Button
              variant="outlined"
              component="label"
              sx={{
                marginTop: 1,
              }}
            >
              <Typography
                variant="caption"
                textTransform={"capitalize"}
              >
                Upload File
              </Typography>

              <input
                name="avatar"
                type="file"
                hidden
                onChange={handleChangeImage}
              />
            </Button>
            <br />
          </Box>
        </Box>
        <Divider />
        <form
          onSubmit={handleUpdateUser}
          id="update-user"
        >
          <Grid
            container
            sx={{ py: 2 }}
            columnSpacing={2}
          >
            <Grid
              item
              xs={12}
              mb={2}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
                color="primary"
              >
                My Informarion
              </Typography>
            </Grid>
            <Grid
              item
              xs={4}
              mb={2}
            >
              <Typography
                variant="body2"
                fontWeight={"600"}
                marginBottom={1}
              >
                User Name
              </Typography>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isUpdate,
                }}
                defaultValue={user.username ?? ""}
                name="username"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={4}
              mb={2}
            >
              <Typography
                variant="body2"
                fontWeight={"600"}
                marginBottom={1}
              >
                First Name
              </Typography>
              <TextField
                fullWidth
                defaultValue={user.firstName ?? ""}
                name="firstName"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={4}
              //   md={6}
              mb={2}
            >
              <Typography
                variant="body2"
                fontWeight={"600"}
                marginBottom={1}
              >
                Last Name
              </Typography>
              <TextField
                fullWidth
                defaultValue={user.lastName ?? ""}
                name="lastName"
                size="small"
              />
            </Grid>
            <Grid
              item
              xs={6}
              md={2}
              mb={2}
            >
              <Typography
                variant="body2"
                fontWeight={"600"}
                marginBottom={1}
              >
                Gender
              </Typography>
              <FormControl
                sx={{ marginRight: 2 }}
                fullWidth
              >
                <Select
                  labelId="display-option-select"
                  id="demo-simple-select"
                  value={gender}
                  name="gender"
                  onChange={handleChangeGender}
                  sx={{
                    "&.MuiOutlinedInput-root": {
                      //   background: "#F8F8F8",
                      height: "44px",
                    },
                  }}
                >
                  <MenuItem value={UserGender.Female}>{UserGender.Female}</MenuItem>
                  <MenuItem value={UserGender.Male}>{UserGender.Male}</MenuItem>
                  <MenuItem value={UserGender.Other}>{UserGender.Other}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={6}
              md={4}
              mb={2}
            >
              <Typography
                variant="body2"
                fontWeight={"600"}
                marginBottom={1}
              >
                Phone Number
              </Typography>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isUpdate,
                }}
                defaultValue={user.phoneNumber ?? ""}
                name="phoneNumber"
                size="small"
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              mb={2}
            >
              <Typography
                variant="body2"
                fontWeight={"600"}
                marginBottom={1}
              >
                Email
              </Typography>
              <TextField
                fullWidth
                InputProps={{
                  readOnly: isUpdate,
                }}
                defaultValue={user.email ?? ""}
                name="email"
                size="small"
              />
            </Grid>

            <Grid
              item
              xs={12}
              mb={4}
            >
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              mb={1}
            >
              <Typography
                variant="body1"
                fontWeight={"600"}
                color="primary"
              >
                Addresses Informarion
              </Typography>
            </Grid>
            {!!appendList &&
              !!appendList.length &&
              appendList.map((item, index) => (
                <>
                  <InforAddress
                    key={index}
                    item={item}
                    index={index}
                    handleInputChange={handleInputChange}
                    handleRemoveAddress={handleRemoveAddress}
                    isUpdate={isUpdate}
                  />
                  {index !== appendList.length - 1 && (
                    <Grid
                      item
                      xs={12}
                    >
                      <Divider />
                    </Grid>
                  )}
                </>
              ))}
            {!appendList?.length && (
              <Grid
                item
                xs={12}
              >
                <Typography color="error">No addresses</Typography>
              </Grid>
            )}
            {isUpdate && (
              <Grid
                item
                xs={12}
                textAlign={"end"}
              >
                <Button
                  startIcon={<Add />}
                  variant="outlined"
                  type="button"
                  onClick={handleAddAddress}
                >
                  Add Detail
                </Button>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            textAlign={"end"}
          >
            {isUpdate ? (
              <>
                <Button
                  className="btn-cancel"
                  sx={{
                    mr: 2,
                  }}
                  onClick={() => setIsUpdate(!isUpdate)}
                >
                  Cancel
                </Button>
                <Button
                  className="btn-action"
                  variant="contained"
                  type="submit"
                  form="update-user"
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                className="btn-action"
                variant="contained"
                onClick={() => setIsUpdate(true)}
              >
                Update
              </Button>
            )}
          </Grid>
        </form>
      </Container>
    </Card>
  );
}
