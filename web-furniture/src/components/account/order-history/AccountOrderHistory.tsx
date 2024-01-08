/* eslint-disable max-lines */
import { primary } from "@/config/theme";
import useBillList from "@/hooks/bills/useBillList";
import { Bill, BillStatus } from "@/types/bill";
import { ListOptions } from "@/types/shared";
import { GetUser } from "@/types/user";
import { AppBar, Box, Card, Grid, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import BillCard from "./BillCard";
type Props = {
  user: GetUser;
};
function a11yProps(type: string) {
  return {
    id: `simple-tab-${type}`,
    "aria-controls": `simple-tabpanel-${type}`,
  };
}
export default function AccountOrderHistory({ user }: Props) {
  const [options, setOptions] = useState<ListOptions<Bill>>({
    user: user._id,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const { data: bills, isLoading } = useBillList(options);
  console.log("bill", bills);
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue);
    setValue(newValue);
    if (newValue == 0) {
      setOptions({
        user: user._id,
      });
    } else if (newValue === 1) {
      console.log("waiting");
      setOptions({
        ...options,
        status: BillStatus.Waiting,
      });
    } else if (newValue === 2) {
      setOptions({
        ...options,
        status: BillStatus.Processing,
      });
    } else if (newValue === 3) {
      setOptions({
        ...options,
        status: BillStatus.Shipping,
      });
    } else if (newValue === 4) {
      setOptions({
        ...options,
        status: BillStatus.Success,
      });
    } else if (newValue === 5) {
      setOptions({
        ...options,
        status: BillStatus.Cancel,
      });
    }
  };
  return (
    <Box>
      {/* <AccountTabStatusOrder /> */}
      {/* <Card sx={{ borderRadius: 0, mb: 1 }}> */}
      <AppBar
        position="sticky"
        //   top={0} // Adjust this value according to your design
        sx={{
          background: "#FFFFFF",
          top: 0,
          borderTopLeftRadius: "2px",
          borderTopRightRadius: "2px",
        }}
        //   sx={{ background: "none" }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab
            label={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: value === 0 ? primary[400] : "black",
                  // fontWeight: value === 0 ? "bold" : "400",
                }}
              >
                All Orders
              </Typography>
            }
            {...a11yProps("All")}
            sx={{
              py: 3,
            }}
          />
          <Tab
            label={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: value === 1 ? primary[400] : "black",
                  // fontWeight: value === 1 ? "bold" : "400",
                }}
              >
                {BillStatus.Waiting}
              </Typography>
            }
            {...a11yProps(BillStatus.Waiting)}
          />
          <Tab
            label={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: value === 2 ? primary[400] : "black",
                  // fontWeight: value === 2 ? "bold" : "400",
                }}
              >
                {BillStatus.Processing}
              </Typography>
            }
            {...a11yProps(BillStatus.Processing)}
          />
          <Tab
            label={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: value === 3 ? primary[400] : "black",
                  // fontWeight: value === 3 ? "bold" : "400",
                }}
              >
                {BillStatus.Shipping}
              </Typography>
            }
            {...a11yProps(BillStatus.Shipping)}
          />
          <Tab
            label={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: value === 4 ? primary[400] : "black",
                  // fontWeight: value === 4 ? "bold" : "400",
                }}
              >
                {BillStatus.Success}
              </Typography>
            }
            {...a11yProps(BillStatus.Success)}
          />
          <Tab
            label={
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{
                  color: value === 5 ? primary[400] : "black",
                  // fontWeight: value === 5 ? "bold" : "400",
                }}
              >
                {BillStatus.Cancel}
              </Typography>
            }
            {...a11yProps(BillStatus.Cancel)}
          />
        </Tabs>
      </AppBar>
      {/* </Card> */}
      <Grid container>
        {!!bills &&
          !!bills.items &&
          !!bills.items.length &&
          bills.items.map((item, index) => (
            <>
              <BillCard
                key={item._id}
                item={item}
                indexBill={index}
              />
            </>
          ))}
        {!bills?.items?.length && (
          <Card
            sx={{
              borderRadius: 0,
              height: "400px",
              width: "100%",
              margin: "auto",
              //   boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)",
              display: "flex",
            }}
          >
            <Box sx={{ textAlign: "center", margin: "auto" }}>
              <Image
                src="/images/no-order.png"
                alt="no-order"
                width={120}
                height={120}
              />
              <Typography
                variant="h5"
                fontWeight={"bold"}
                color="darkslategray"
              >
                No Orders
              </Typography>
            </Box>
          </Card>
        )}
      </Grid>
      {/* </Container> */}
    </Box>
  );
}
