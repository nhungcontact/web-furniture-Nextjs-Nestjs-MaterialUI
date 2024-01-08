/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import usePromotionCreate from "@/hooks/promotions/usePromotionCreate";
import usePromotionUpdate from "@/hooks/promotions/usePromotionUpdate";
import {
  Promotion,
  PromotionCreateInput,
  PromotionStatus,
  PromotionType,
} from "@/types/promotion";
import { jsonForm } from "@/utils/form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

import { FormEvent, useState } from "react";
type Props = {
  handleClose: () => void;
  open: boolean;
  title?: string;
  data?: Promotion;
  view: boolean;
};
export default function OptionDialogCreate({
  handleClose,
  open,
  title,
  data,
  view,
}: Props) {
  const { trigger: createPromotion } = usePromotionCreate();
  const { trigger: updatePromotion } = usePromotionUpdate(data?._id ?? "");

  const [dateApply, setDateApply] = useState<Dayjs | null>(
    data ? dayjs(data.dateApply) : dayjs(),
  );
  const [dateExpire, setDateExpire] = useState<Dayjs | null>(
    data ? dayjs(data.dateExpire) : dayjs(),
  );

  const [promotionType, setPromotionType] = useState<PromotionType>(
    data && data.type ? data.type : PromotionType.Number,
  );

  const handleChange = (event: SelectChangeEvent<PromotionType>) => {
    setPromotionType(event.target.value as PromotionType);
  };

  const handleSubmitOption = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (dateExpire && dateApply) {
      const d1 = new Date(dateExpire.toDate());
      const d2 = new Date(dateApply.toDate());
      if (d1 < d2) {
        alert("The expiration date must be older than the application date!");
      } else if (d2 < new Date()) {
        alert("The apply date must be older than the cuurent date!");
      } else {
        let input = {} as PromotionCreateInput;
        if (promotionType === PromotionType.Number) {
          console.log(dateExpire.format("MM-DD-YYYY"));
          input = {
            name: json.name as string,
            couponCode: json.couponCode as string,
            description: json.description as string,
            status: json.status as PromotionStatus,
            type: promotionType as PromotionType,
            quantity: Number(json.quantity),
            priceMinimumApply: Number(json.priceMinimumApply),
            numberDiscountByNumber: Number(json.numberDiscountByNumber),
            dateExpire: dateExpire.toDate(),
            dateApply: dateApply.toDate(),
          };
          console.log("input", input);
        } else {
          console.log("dsd");
          input = {
            name: json.name as string,
            couponCode: json.couponCode as string,
            description: json.description as string,
            status: json.status as PromotionStatus,
            type: promotionType as PromotionType,
            quantity: Number(json.quantity),
            priceMinimumApply: Number(json.priceMinimumApply),
            percentDiscount: Number(json.percentDiscount),
            priceMaximumByPercent: Number(json.priceMaximumByPercent),
            dateExpire: dateExpire.toDate(),
            dateApply: dateApply.toDate(),
          };
        }
        if (data) {
          updatePromotion({
            body: input,
          })
            .then(() => {
              handleClose();
              alert("successfully");
              // enqueueSnackbar("successfully", { variant: "success" });
            })
            .catch((e) => {
              alert(e?.message);
            });
        } else {
          createPromotion({
            body: input,
          })
            .then(() => {
              handleClose();
              alert("That was easy!");
              // enqueueSnackbar("successfully", { variant: "success" });
            })
            .catch((e) => {
              alert(e?.message);
              //   enqueueSnackbar(e?.message, { variant: "error" });
            });
        }
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
          {view ? <b>View Promotion</b> : <b>{data ? "Update" : "Create"} Promotion</b>}
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ background: "#F8F8F8" }}
        >
          {title && <DialogContentText mb={2}>{title}</DialogContentText>}
          <form
            onSubmit={handleSubmitOption}
            id="create-option"
          >
            <Grid
              container
              justifyContent="space-between"
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
                  color="black"
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Promotion Name
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <TextField
                  disabled={view}
                  fullWidth
                  id="name"
                  defaultValue={data?.name ?? ""}
                  name="name"
                  type="text"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Coupon Code
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <TextField
                  disabled={view}
                  fullWidth
                  id="name"
                  defaultValue={data?.couponCode ?? ""}
                  name="couponCode"
                  type="text"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                />
                <FormHelperText id="component-helper-text">
                  ex: COUPONCODESPRING
                </FormHelperText>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Promotion Quantity
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <TextField
                  disabled={view}
                  fullWidth
                  id="name"
                  defaultValue={data?.quantity ?? ""}
                  name="quantity"
                  type="number"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Promotion type
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="display-option-select"
                    id="demo-simple-select"
                    value={promotionType}
                    name="type"
                    onChange={handleChange}
                    disabled={data || view ? true : false}
                    sx={{
                      "&.MuiOutlinedInput-root": {
                        background: "#FFFFFF",
                      },
                    }}
                  >
                    <MenuItem value={PromotionType.Number}>
                      {PromotionType.Number}
                    </MenuItem>
                    <MenuItem value={PromotionType.Percent}>
                      {PromotionType.Percent}
                    </MenuItem>
                  </Select>
                </FormControl>
                {promotionType === PromotionType.Number && (
                  <FormHelperText id="component-helper-text">
                    ex: Type is Number, the product will be discounted by $100 .
                  </FormHelperText>
                )}
                {promotionType === PromotionType.Percent && (
                  <FormHelperText id="component-helper-text">
                    ex: Type is Percent, products will be 15% off (maximum price is $50).
                  </FormHelperText>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  marginBottom={1}
                  sx={{ display: "inline-flex" }}
                >
                  Price Minimum Apply
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <TextField
                  disabled={view}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  fullWidth
                  id="name"
                  defaultValue={data?.priceMinimumApply ?? ""}
                  name="priceMinimumApply"
                  type="number"
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                />
                <FormHelperText id="component-helper-text">
                  ex: Buy minimum is $100 to get discount, $100 is price minimum apply
                </FormHelperText>
              </Grid>
              {promotionType === PromotionType.Percent ? (
                <>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    mb={2}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"600"}
                      color="black"
                      marginBottom={1}
                      sx={{ display: "inline-flex" }}
                    >
                      Percent Discount
                    </Typography>
                    <Typography
                      color="red"
                      sx={{ display: "inline-flex" }}
                    >
                      *
                    </Typography>
                    <TextField
                      disabled={view}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        ),
                      }}
                      fullWidth
                      id="name"
                      defaultValue={data?.percentDiscount ?? ""}
                      name="percentDiscount"
                      type="number"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                    />
                    <FormHelperText id="component-helper-text">
                      ex: Products will be 15% off, 15% is percent discount
                    </FormHelperText>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    mb={2}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"600"}
                      color="black"
                      marginBottom={1}
                      sx={{ display: "inline-flex" }}
                    >
                      Price Maximum (Percent)
                    </Typography>
                    <Typography
                      color="red"
                      sx={{ display: "inline-flex" }}
                    >
                      *
                    </Typography>
                    <TextField
                      disabled={view}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      fullWidth
                      id="name"
                      defaultValue={data?.priceMaximumByPercent ?? ""}
                      name="priceMaximumByPercent"
                      type="number"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          background: "#FFFFFF",
                        },
                      }}
                    />
                    <FormHelperText id="component-helper-text">
                      ex: Products will be 15% off but the maximum price is $50, $50 is
                      price maximum
                    </FormHelperText>
                  </Grid>
                </>
              ) : (
                <Grid
                  item
                  xs={12}
                  mb={2}
                >
                  <Typography
                    variant="body1"
                    fontWeight={"600"}
                    color="black"
                    marginBottom={1}
                    sx={{ display: "inline-flex" }}
                  >
                    Price Discount (Number)
                  </Typography>
                  <Typography
                    color="red"
                    sx={{ display: "inline-flex" }}
                  >
                    *
                  </Typography>
                  <TextField
                    disabled={view}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                    fullWidth
                    id="name"
                    defaultValue={data?.numberDiscountByNumber ?? ""}
                    name="numberDiscountByNumber"
                    type="number"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "#FFFFFF",
                      },
                    }}
                  />
                </Grid>
              )}

              <Grid
                item
                xs={12}
                md={6}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  sx={{ display: "inline-flex" }}
                >
                  Date Apply
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                {view ? (
                  <Typography>
                    {data && new Date(data.dateApply).toLocaleString()}
                  </Typography>
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                      <DateTimePicker
                        slotProps={{ textField: { fullWidth: true } }}
                        value={dateApply}
                        onChange={(newValue) => setDateApply(newValue)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            background: "#FFFFFF",
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  sx={{ display: "inline-flex" }}
                >
                  Date Expire
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                {view ? (
                  <Typography>
                    {data && new Date(data.dateExpire).toLocaleString()}
                  </Typography>
                ) : (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                      <DateTimePicker
                        slotProps={{ textField: { fullWidth: true } }}
                        value={dateExpire}
                        onChange={(newValue) => setDateExpire(newValue)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            background: "#FFFFFF",
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
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
                  color="black"
                  sx={{ display: "inline-flex" }}
                >
                  Status
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <RadioGroup
                  row
                  name="status"
                  //   defaultValue={
                  //     updateData ? updateData.status : BlogStatus.UnApproved
                  //   }
                  defaultValue={PromotionStatus.Active}
                >
                  <FormControlLabel
                    value={PromotionStatus.Active}
                    control={<Radio />}
                    label={PromotionStatus.Active}
                    disabled={view}
                  />
                  <FormControlLabel
                    value={PromotionStatus.Inactive}
                    control={<Radio />}
                    label={PromotionStatus.Inactive}
                    disabled={view}
                  />
                </RadioGroup>
              </Grid>
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Typography
                  variant="body1"
                  fontWeight={"600"}
                  color="black"
                  marginBottom={1}
                >
                  Description
                </Typography>

                <TextField
                  disabled={view}
                  fullWidth
                  id="name"
                  defaultValue={data?.name ?? ""}
                  name="description"
                  type="text"
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Enter a description"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "#FFFFFF",
                    },
                  }}
                />
              </Grid>
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
          {!view && (
            <Button
              size="medium"
              variant="contained"
              type="submit"
              color="primary"
              form="create-option"
              className="btn-action"
            >
              {data ? "Update" : "Create"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
