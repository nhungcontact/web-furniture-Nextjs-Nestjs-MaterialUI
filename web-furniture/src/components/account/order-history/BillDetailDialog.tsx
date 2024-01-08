/* eslint-disable max-lines */
import { BillPaymentMethod, BillStatus, GetBill } from "@/types/bill";
import { User } from "@/types/user";
import {
  AccountCircle,
  Close,
  DescriptionSharp,
  LocalPhoneOutlined,
  MailOutline,
  Payments,
  PersonPinCircle,
} from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Typography,
  stepConnectorClasses,
  styled,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import QontoStepIcon from "./OrderStepperStyled";
import ProductDetail from "./ProductDetail";
type Props = {
  data: GetBill;
  open: boolean;
  handleClose: () => void;
};

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));
export default function BillDetailDialog({ data, open, handleClose }: Props) {
  const [value, setValue] = useState<number>();
  useEffect(() => {
    if (data.status === BillStatus.Waiting) {
      setValue(1);
    } else if (data.status === BillStatus.Processing) {
      setValue(2);
    } else if (data.status === BillStatus.Shipping) {
      setValue(3);
    } else if (data.status === BillStatus.Success) {
      setValue(4);
    }
  }, [data.status]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      maxWidth="md"
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Bill Detail <i style={{ fontWeight: "400" }}>#{data.number}</i>
        </Typography>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers={true}>
        <Grid container>
          <Typography
            color="black"
            variant="body1"
            fontWeight="bold"
          >
            Process Order
          </Typography>
          <Grid
            item
            xs={12}
            mt={2}
          >
            <Stepper
              activeStep={value}
              alternativeLabel
              connector={<QontoConnector />}
            >
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                  >
                    {BillStatus.Waiting}
                  </Typography>
                  <Typography variant="caption">
                    {value === 1 && new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                  >
                    {BillStatus.Processing}
                  </Typography>
                  <Typography variant="caption">
                    {value === 2 && new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                  >
                    {BillStatus.Shipping}
                  </Typography>
                  <Typography variant="caption">
                    {value === 3 && new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                  >
                    {BillStatus.Success}
                  </Typography>
                  <Typography variant="caption">
                    {value === 4 && new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </StepLabel>
              </Step>
            </Stepper>
          </Grid>
          <Grid
            item
            xs={12}
            my={2}
          >
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            mb={2}
          >
            <Typography
              color="black"
              variant="body1"
              fontWeight="bold"
              mb={2}
            >
              Information Customer
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              mb={1}
              px={2}
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
              px={2}
            >
              <MailOutline />
              <Typography
                ml={2}
                noWrap
                variant="body1"
              >
                {data.user.email}
              </Typography>
            </Box>

            <Box
              display={"flex"}
              alignItems={"center"}
              mb={1}
              px={2}
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
            <Typography
              color="black"
              variant="body1"
              fontWeight="bold"
              my={2}
            >
              Delivery Address
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              mb={1}
              px={2}
            >
              <PersonPinCircle />
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
            <Typography
              color="black"
              variant="body1"
              fontWeight="bold"
              my={2}
            >
              Payment Method
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              mb={1}
              px={2}
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
            <Typography
              color="black"
              variant="body1"
              fontWeight="bold"
              my={2}
            >
              Note
            </Typography>
            <Box
              sx={{
                background: "rgb(255, 244, 229)",
                height: "100px",
                p: 2,
              }}
              display={"flex"}
              alignItems={"start"}
            >
              <DescriptionSharp />
              <Typography
                fontWeight={"bold"}
                variant="body1"
                ml={2}
              >
                {data.message ?? "No note"}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            my={2}
          >
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography
              color="black"
              variant="body1"
              fontWeight="bold"
            >
              Information Product
            </Typography>
            <Grid container>
              {data.billItems &&
                data.billItems.length &&
                data.billItems.map((billItem, index) => (
                  <>
                    <Grid
                      key={index}
                      item
                      xs={12}
                      my={1}
                    >
                      <ProductDetail
                        item={billItem}
                        i={index}
                        isDetail={true}
                        bill={data}
                      />
                    </Grid>
                    {index !== data.billItems.length - 1 && (
                      <Grid
                        item
                        xs={12}
                      >
                        <Divider />
                      </Grid>
                    )}
                  </>
                ))}
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
          >
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            textAlign={"end"}
            my={3}
          >
            <Grid
              container
              justifyContent={"end"}
              alignItems={"center"}
              mb={1}
            >
              <Grid
                item
                xs={6}
                display={"flex"}
                justifyContent={"end"}
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
                  color="GrayText"
                >
                  ({data.billItems.length} items)
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                textAlign={"end"}
              >
                <Typography
                  variant="body1"
                  noWrap
                  color="black"
                  fontWeight={"bold"}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.price)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent={"end"}
              alignItems={"center"}
              mb={1}
            >
              <Grid
                item
                xs={6}
                display={"flex"}
                justifyContent={"end"}
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
                  color="GrayText"
                >
                  ({data.address.province})
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                textAlign={"end"}
              >
                <Typography
                  variant="body1"
                  noWrap
                  color="black"
                  fontWeight={"bold"}
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.shipping ?? 20)}
                </Typography>
              </Grid>
            </Grid>
            {!!data.promotionPrice && !!data.promotion && (
              <Grid
                container
                justifyContent={"end"}
                alignItems={"center"}
              >
                <Grid
                  item
                  xs={6}
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
                  <Typography
                    variant="body1"
                    color="black"
                    fontWeight={"bold"}
                    noWrap
                  >
                    -
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(data.promotionPrice)}{" "}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid
              container
              justifyContent={"end"}
              alignItems={"center"}
            >
              <Grid
                item
                xs={6}
              >
                <Typography
                  variant="body1"
                  noWrap
                  fontWeight="bold"
                >
                  Total Price
                </Typography>
              </Grid>

              <Grid
                item
                xs={4}
                textAlign={"end"}
              >
                <Typography
                  variant="h4"
                  noWrap
                  fontWeight="bold"
                  color="primary"
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(data.grandTotal)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
