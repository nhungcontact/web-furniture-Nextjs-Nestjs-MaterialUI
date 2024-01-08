/* eslint-disable max-lines */
import useBillCreate from "@/hooks/bills/useBillCreate";
import useBillUpdate from "@/hooks/bills/useBillUpdate";
import usePaymentConfirm from "@/hooks/bills/usePaymentConfirm";
import { BillCreateInput, BillPaymentMethod, CartPayment } from "@/types/bill";
import { BillItemCreateInput } from "@/types/bill-item";
import { CartItemInCart } from "@/types/cart-item";
import getCart from "@/utils/getCart";
import getPayment from "@/utils/getPayment";
import getPaymentIntentID from "@/utils/getPaymentIntentID";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Cards, { Focused } from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
type Props = {
  handleClose: () => void;
  open: boolean;
  bill?: BillCreateInput;
  billItems?: BillItemCreateInput[];
};
const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRegExp, "Email is not valid")
    .required("Email is required!"),
});
export default function FormCheckoutWithStripe({
  handleClose,
  open,
  bill,
  billItems,
}: Props) {
  const router = useRouter();
  //   const countries = Country.getAllCountries();
  const { trigger: payment } = usePaymentConfirm();
  const { trigger: createBill } = useBillCreate();
  const { trigger: updateBill } = useBillUpdate();
  const [state, setState] = useState({
    number: "",
    expiry: dayjs("2022-04-17") as Dayjs,
    cvc: "",
    name: "",
    focus: "" as Focused,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    if (event.target.name === "number") {
      value = Math.max(0, parseInt(value)).toString().slice(0, event.target.maxLength);
    }
    if (event.target.name === "cvc") {
      value = Math.max(0, parseInt(value)).toString().slice(0, event.target.maxLength);
    }

    setState((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleInputFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => {
    const { name } = event.target;
    setState((prev) => ({ ...prev, focus: name as Focused }));
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    // defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(bill, billItems);

    if (bill && billItems && billItems.length && state.number) {
      console.log(data, state);
      createBill({
        body: { ...bill, paymentMethod: BillPaymentMethod.Card },
      })
        .then((res) => {
          if (
            res._id &&
            getPayment(state.number) &&
            getPayment(state.number)?.paymentMethod &&
            getPaymentIntentID()
          ) {
            payment({
              body: {
                paymentMethod: getPayment(state.number)?.paymentMethod as string,
                paymentIntentID: (getPaymentIntentID() as CartPayment).paymentIntentID,
                billId: res._id,
              },
            })
              .then(() => {
                console.log("successfull!");
                updateBill({
                  body: {
                    billItems: billItems,
                    billId: res._id,
                    ...(getPayment(state.number)?.cardName
                      ? { cardName: getPayment(state.number)?.cardName }
                      : {}),
                  },
                })
                  .then(() => {
                    localStorage.removeItem("bill");
                    const cart = getCart();
                    if (
                      cart &&
                      cart.detailCarts &&
                      cart.detailCarts.length &&
                      bill.billItems
                    ) {
                      let val = [] as CartItemInCart[];
                      for (const i of bill.billItems) {
                        val = cart.detailCarts.filter(
                          (item) => item.productSku._id !== i.productSkuId,
                        );
                        console.log("val", val);
                      }
                      localStorage.removeItem("cartItems");
                      localStorage.removeItem("bill");
                      localStorage.removeItem("cartPayment");
                      localStorage.setItem("cartItems", JSON.stringify(val));
                      router.push("account");
                    }
                  })
                  .catch((e) => {
                    alert(e?.message);
                  });
              })
              .catch((e) => {
                alert(e?.message);
              });
          }
        })
        .catch((e) => {
          alert(e?.message);
        });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={"md"}
      scroll={"paper"}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <b>Checkout with Stripe</b>
      </DialogTitle>
      <DialogContent
        // sx={{ background: "#F8F8F8" }}
        dividers={true}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          id="checkout-stripe"
        >
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              mb={2}
            >
              <Typography
                variant="body2"
                textTransform={"capitalize"}
                fontWeight={"bold"}
              >
                Email
              </Typography>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    sx={{
                      marginTop: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        // background: "#FFFFFF",
                      },
                    }}
                    fullWidth
                    value={value}
                    variant="filled"
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
                variant="body2"
                textTransform={"capitalize"}
                fontWeight={"bold"}
              >
                Card number
              </Typography>

              <Grid
                container
                justifyContent="space-between"
                alignItems="start"
                mt={1}
              >
                <Grid
                  item
                  xs={5}
                >
                  <Cards
                    number={state.number}
                    expiry={state.expiry.toString()}
                    cvc={state.cvc}
                    name={state.name}
                    // placeholders={state.placeholders}
                    focused={state.focus}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                >
                  <TextField
                    fullWidth
                    label="Card Number"
                    type="number"
                    name="number"
                    InputProps={{ inputProps: { min: 0, maxLength: 16 } }}
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    sx={{
                      marginBottom: 1,
                      "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="CVC"
                    type="number"
                    name="cvc"
                    placeholder="CCV"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    InputProps={{ inputProps: { min: 0, maxLength: 3 } }}
                    sx={{
                      marginBottom: 1,
                      "input::-webkit-outer-spin-button,input::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none",
                          margin: 0,
                        },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    sx={{ marginBottom: 1 }}
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker", "DatePicker", "DatePicker"]}
                    >
                      <DatePicker
                        views={["month", "day"]}
                        onChange={(newValue) => {
                          setState((prev) => ({ ...prev, expiry: newValue as Dayjs }));
                        }}
                        format="dd-MM"
                        label="Expiry Date"
                        // onFocus={handleInputFocus}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          variant="contained"
          onClick={handleClose}
          className="btn-cancel"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          form="checkout-stripe"
          className="btn-action"
        >
          Checkout Now
        </Button>
      </DialogActions>
    </Dialog>
  );
}
