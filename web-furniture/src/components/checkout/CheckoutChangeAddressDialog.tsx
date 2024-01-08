import { GetAddress } from "@/types/address";
import { Add, Person } from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  selectedValue: GetAddress | null;
  onClose: (value: GetAddress) => void;
  address: GetAddress[];
};
export default function CheckoutChangeAddressDialog({
  open,
  selectedValue,
  onClose,
  address,
}: Props) {
  const router = useRouter();
  const handleClose = () => {
    if (selectedValue) {
      onClose(selectedValue);
    }
  };

  const handleListItemClick = (value: GetAddress) => {
    onClose(value);
    console.log("O close", value);
  };

  //   useEffect(() => {
  //     if (user && user.address && user.address.length) {
  //       const data = user.address.filter((item) => item.isDefault === true);
  //       setSelectedValue(data[0]);
  //       getAddress(data[0]);
  //     }
  //     if (selectedValue) {
  //       console.log("dszsa", selectedValue);
  //       getAddress(selectedValue);
  //     }
  //   }, [getAddress, selectedValue, user]);

  return (
    <>
      <Dialog
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>
          {address && address.length ? "Change Address" : "Add Address"}
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {address &&
            address.map((item) => (
              <ListItem
                disableGutters
                key={item._id}
              >
                <ListItemButton
                  onClick={() => handleListItemClick(item)}
                  selected={item === selectedValue}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography>
                        {item.addressDetail +
                          ", " +
                          item.commune +
                          ", " +
                          item.district +
                          ", " +
                          item.province}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            ))}
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={() => router.push("/account")}
            >
              <ListItemAvatar>
                <Avatar>
                  <Add />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add address" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}
