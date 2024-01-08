/* eslint-disable max-lines */
"use client";
import useBillDetail from "@/hooks/bills/useBillDetail";
import useBillUpdateRequestCancel from "@/hooks/bills/useBillUpdateRequestCancel";
import { BillPaymentMethod, BillUpdateInput } from "@/types/bill";
import { ProcessingStatus, RequestCancel } from "@/types/request-cancel";
import {
  AccountCircle,
  Home,
  LocalPhoneOutlined,
  MailOutline,
  Payments,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  LinearProgress,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import BillItemTableBody from "./BillItemTableBody";
import BillItemTableHead from "./BillItemTableHead";
import BillUpdateStatus from "./BillUpdateStatus";
import { useSnackbar } from "notistack";

export type Order = "asc" | "desc";

export default function BillItemTable() {
  const param = useParams();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { data, error, isLoading, isValidating } = useBillDetail(param.id as string);
  const [requestCancel, setRequestCancel] = useState("");
  const { trigger: updateRequestCancel } = useBillUpdateRequestCancel(
    data ? data._id : "",
  );
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setRequestCancel("");
  };

  const handleChangeRequestCancel = (event: ChangeEvent<HTMLInputElement>) => {
    setRequestCancel((event.target as HTMLInputElement).value);
    setOpen(true);
  };

  const handleRequestCancel = (status: string) => {
    console.log(status);
    if (data) {
      updateRequestCancel({
        body: {
          requestCancel: {
            ...data.requestCancel,
            processingStatus: status,
          } as RequestCancel,
        } as BillUpdateInput,
      })
        .then(() => {
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          router.push("/bills");
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        });
    }
  };
  return (
    <Box sx={{ width: "100%", overflow: "hidden", p: 4 }}>
      <Box
        // textAlign="start"
        py={2}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          className="btn-action"
          sx={{ borderRadius: "15px" }}
        >
          Total: {data?.billItems?.length ?? "-"}
        </Button>

        <Typography variant="body1">
          Order <b>#{data?.number}</b>
        </Typography>
      </Box>

      <TableContainer sx={{ margin: "auto" }}>
        {(isValidating || isLoading) && (
          <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
        )}
        <Table
          stickyHeader
          aria-label="sticky table"
        >
          <BillItemTableHead />

          <TableBody>
            {!!data &&
              !!data.billItems.length &&
              data.billItems.map((item, index) => {
                //   const isItemSelected = isSelected(item._id);
                return (
                  <BillItemTableBody
                    key={item._id}
                    data={item}
                    index={index}
                    //   onClickSelect={handleClick}
                    //   isItemSelected={isItemSelected}
                  />
                );
              })}
            {!isLoading && !data && (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={10}
                >
                  <Typography
                    variant={"body1"}
                    fontWeight={600}
                    textTransform={"capitalize"}
                    color="black"
                  >
                    No data
                  </Typography>
                </TableCell>{" "}
              </TableRow>
            )}
            {!isLoading && error && (
              <TableRow>
                <TableCell
                  align="center"
                  colSpan={10}
                >
                  <Typography
                    variant={"body1"}
                    color="red"
                  >
                    {error?.message}
                  </Typography>
                </TableCell>{" "}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Divider />
        {!!data && !!data.billItems && !!data.billItems.length && (
          <Box mt={4}>
            <Grid
              container
              justifyContent={"end"}
              mb={2}
            >
              <Grid
                item
                xs={4}
                display={"flex"}
              >
                <Typography
                  variant="body1"
                  noWrap
                  mr={1}
                >
                  Subtotal
                </Typography>
                <Typography
                  variant="body1"
                  noWrap
                  color="secondary"
                >
                  ({data.billItems.length} items)
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                textAlign={"end"}
              >
                <Typography
                  variant="body1"
                  noWrap
                  color="secondary"
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "vnd",
                  }).format(data.price)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent={"end"}
              mb={2}
            >
              <Grid
                item
                xs={4}
                display={"flex"}
              >
                <Typography
                  variant="body1"
                  noWrap
                  mr={1}
                >
                  Shipping{" "}
                </Typography>
                <Typography
                  variant="body1"
                  noWrap
                  color="secondary"
                >
                  ({data.address.province})
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                textAlign={"end"}
              >
                <Typography
                  variant="body1"
                  noWrap
                  color="secondary"
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "vnd",
                  }).format(data.shipping ?? 20)}
                </Typography>
              </Grid>
            </Grid>
            {data.promotionPrice && (
              <Grid
                container
                justifyContent={"end"}
              >
                <Grid
                  item
                  xs={4}
                >
                  <Typography
                    variant="body1"
                    noWrap
                  >
                    Promotion Price{" "}
                    {data.promotion.percentDiscount && (
                      <i>({data.promotion.percentDiscount}%)</i>
                    )}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  textAlign={"end"}
                >
                  <Typography>
                    -
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "vnd",
                    }).format(data.promotionPrice)}{" "}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid
              container
              justifyContent={"end"}
              my={2}
            >
              <Grid
                item
                xs={4}
              >
                <Typography
                  variant="body1"
                  noWrap
                  fontWeight="bold"
                >
                  Total, Paid by customer
                </Typography>
              </Grid>

              <Grid
                item
                xs={2}
                textAlign={"end"}
              >
                <Typography
                  variant="body1"
                  noWrap
                  fontWeight="bold"
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "vnd",
                  }).format(data.grandTotal)}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              mt={4}
            >
              <Grid
                item
                xs={5}
              >
                <Typography
                  mb={2}
                  color="secondary.dark"
                >
                  Customers details
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  mb={1}
                >
                  {data.user.avatar && (
                    <Image
                      src={data.user.avatar.imageURL ?? "/"}
                      alt={data.user.avatar.name ?? "-"}
                      width={100}
                      height={100}
                    />
                  )}
                  {!data.user.avatar && <AccountCircle />}
                  <Typography
                    fontWeight={600}
                    variant="body1"
                    ml={2}
                    noWrap
                  >
                    {data.user.firstName + " " + data.user.lastName + " " ?? "-"}(
                    {data.user.username})
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  mb={1}
                >
                  <MailOutline />
                  <Typography
                    ml={2}
                    noWrap
                  >
                    {data.user.email}
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  alignItems={"center"}
                  mb={1}
                >
                  <LocalPhoneOutlined />
                  <Typography
                    ml={2}
                    noWrap
                    variant="body1"
                  >
                    {data.user.phoneNumber}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                xs={7}
              >
                <Typography
                  mb={2}
                  color="secondary.dark"
                >
                  Notes
                </Typography>
                <Box sx={{ background: "rgb(255, 244, 229)", height: "150px", p: 2 }}>
                  <Typography
                    fontWeight={"bold"}
                    variant="body1"
                  >
                    {data.message ?? "No note"}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                container
                mt={2}
              >
                <Grid
                  item
                  xs={5}
                >
                  <Box>
                    <Typography
                      mb={2}
                      color="secondary.dark"
                      variant="body1"
                    >
                      Address delivery
                    </Typography>

                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      mb={1}
                    >
                      <Home />
                      <Typography
                        ml={2}
                        noWrap
                        variant="body1"
                      >
                        {data.address.addressDetail +
                          ", " +
                          data.address.commune +
                          ", " +
                          data.address.district +
                          ", " +
                          data.address.province}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={4}>
                    <Typography
                      mb={2}
                      color="secondary.dark"
                      variant="body1"
                    >
                      Payment Method
                    </Typography>

                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      mb={1}
                    >
                      <Payments />
                      <Typography
                        ml={2}
                        noWrap
                        variant="body1"
                      >
                        {data.paymentMethod === BillPaymentMethod.Card
                          ? `Payment with card (${data.cardName})`
                          : "Payment with cod (Cash on Delivery)"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    columnSpacing={10}
                  >
                    <Grid item>
                      <Typography
                        mb={2}
                        color="secondary.dark"
                        variant="body1"
                      >
                        Status
                      </Typography>
                      <BillUpdateStatus data={data} />
                    </Grid>
                    {data.requestCancel && (
                      <Grid item>
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">
                            <Typography
                              mb={2}
                              color="error"
                              variant="body1"
                              fontWeight="bold"
                            >
                              Request Cancel
                            </Typography>
                          </FormLabel>

                          <Typography
                            variant="body1"
                            mb={2}
                          >
                            <b>Reason: </b>
                            {data.requestCancel ? data.requestCancel.reason : ""}
                          </Typography>

                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            value={requestCancel}
                            onChange={handleChangeRequestCancel}
                          >
                            <FormControlLabel
                              value={ProcessingStatus.Approved}
                              control={<Radio />}
                              label={ProcessingStatus.Approved}
                            />
                            <FormControlLabel
                              value={ProcessingStatus.Denied}
                              control={<Radio />}
                              label={ProcessingStatus.Denied}
                            />
                          </RadioGroup>
                        </FormControl>

                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {requestCancel === ProcessingStatus.Denied ? (
                              <b>
                                Are you sure you want to reject the order cancellation?
                              </b>
                            ) : (
                              <b>
                                Are you sure you want to proceed with canceling the order?
                              </b>
                            )}
                          </DialogTitle>
                          <DialogContent dividers>
                            {requestCancel === ProcessingStatus.Denied ? (
                              <Typography variant="body1">
                                <b style={{ color: "red" }}>
                                  {" "}
                                  After refusing to cancel the order:
                                </b>
                                <br /> - Sending an email to notify that the order has
                                been refused cancellation for unreasonable reasons
                                <br />- the product will still continue the preparation
                                and delivery process
                              </Typography>
                            ) : (
                              <Typography variant="body1">
                                <b style={{ color: "red" }}>
                                  {" "}
                                  After accepting the cancellation of the order:
                                </b>
                                <br /> - The product quantity in the inventory will be
                                updated
                                <br />
                                - the item will be removed from the customer is order
                                history
                                <br />- The store will refund the amount (if the order was
                                paid online).
                                <br />
                                <b>
                                  - Send email notification that order has been canceled
                                </b>
                              </Typography>
                            )}
                          </DialogContent>
                          <DialogActions sx={{ m: 1 }}>
                            <Button
                              onClick={handleClose}
                              className="btn-cancel"
                            >
                              Disagree
                            </Button>
                            <Button
                              onClick={() => handleRequestCancel(requestCancel)}
                              autoFocus
                              className="btn-action"
                              variant="contained"
                            >
                              Agree
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* <Box textAlign={"end"}>
              <Button onClick={() => window.print()}>Print</Button>
            </Box> */}
          </Box>
        )}
      </TableContainer>
    </Box>
  );
}
