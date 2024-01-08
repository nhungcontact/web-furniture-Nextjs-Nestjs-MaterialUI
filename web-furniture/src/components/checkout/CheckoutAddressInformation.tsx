import { GetUser } from "@/types/user";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import CheckoutChangeAddressDialog from "./CheckoutChangeAddressDialog";
import { GetAddress } from "@/types/address";
type Props = {
  user?: GetUser;
  isLoading?: boolean;
  getAddress: (value: GetAddress) => void;
};
export default function CheckoutAddressInformation({
  user,
  isLoading,
  getAddress,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<GetAddress | null>(
    user && user.address
      ? user.address.filter((item) => item.isDefault === true)[0]
      : null,
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: GetAddress) => {
    setOpen(false);
    setSelectedValue(value);
    getAddress(value);
  };
  useEffect(() => {
    if (selectedValue) {
      getAddress(selectedValue);
    }
  }, [getAddress, selectedValue]);
  return (
    <>
      <Card>
        <CardHeader
          title="Address Information"
          titleTypographyProps={{ variant: "h5", fontWeight: "600" }}
          action={
            <Button
              variant="outlined"
              onClick={handleClickOpen}
            >
              Address
            </Button>
          }
        />
        <Divider sx={{ margin: 0 }} />

        <CardContent sx={{ padding: 2 }}>
          {!!isLoading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
          {user && user.address && user.address.length > 0 && (
            <Grid container>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  sx={{ display: "inline-flex" }}
                  marginRight={2}
                >
                  Name:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "inline-flex" }}
                >
                  {user?.firstName + " " + user?.lastName}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  sx={{ display: "inline-flex" }}
                  marginRight={2}
                >
                  Phone number:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ display: "inline-flex" }}
                >
                  {user.phoneNumber ?? "-"}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  sx={{ display: "inline-flex" }}
                  marginRight={2}
                >
                  Address:
                </Typography>
                {selectedValue && (
                  <Typography
                    variant="body1"
                    sx={{ display: "inline-flex" }}
                  >
                    {selectedValue.commune +
                      ", " +
                      selectedValue.district +
                      ", " +
                      selectedValue.province}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  sx={{ display: "inline-flex" }}
                  marginRight={2}
                >
                  Detail Address:
                </Typography>
                {selectedValue && (
                  <Typography
                    variant="body1"
                    sx={{ display: "inline-flex" }}
                  >
                    {selectedValue.addressDetail}
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
          {user && user.address && !user.address.length && (
            <Typography>No address</Typography>
          )}

          {user && user.address && (
            <CheckoutChangeAddressDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
              address={user.address}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
