/* eslint-disable max-lines */
import { GetBillItem } from "@/types/bill-item";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import OptionDetail from "./OptionDetail";
import useBillUpdateRequestCancel from "@/hooks/bills/useBillUpdateRequestCancel";
import useUserInfor from "@/hooks/users/useUserInfor";
import { ChangeEvent, FormEvent, useState } from "react";
import { jsonForm } from "@/utils/form";
import { ProcessingStatus, RequestCancel } from "@/types/request-cancel";
import { BillUpdateInput, GetBill } from "@/types/bill";
import { useReasonCancel } from "@/mocks/page.mock";

type Props = {
  billItems: GetBillItem[];
  handleCloseRequest: () => void;
  //   index: number;
  openRequestCancel: boolean;
  bill: GetBill;
};

export default function RequestCancelDialog({
  billItems,
  handleCloseRequest,
  //   index,
  openRequestCancel,
  bill,
}: Props) {
  const reason = useReasonCancel();
  const { data: user } = useUserInfor();
  const { trigger: requestCancel } = useBillUpdateRequestCancel(bill._id);

  const [valueReason, setValueReason] = useState(reason[0].value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValueReason((event.target as HTMLInputElement).value);
  };
  console.log(bill);
  const handleRequestCancel = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const json = jsonForm(e.currentTarget);
    if (user) {
      requestCancel({
        body: {
          requestCancel: {
            bill: bill._id,
            user: user?._id,
            reason: valueReason !== "Other issues" ? valueReason : json.reason,
            processingStatus: ProcessingStatus.Pending,
            requestDate: new Date(),
          } as RequestCancel,
        } as BillUpdateInput,
      })
        .then(() => {
          handleCloseRequest();
          console.log("Success");
        })
        .catch((e) => {
          console.log(e?.message);
        });
    }
  };

  return (
    <Dialog
      open={openRequestCancel}
      onClose={handleCloseRequest}
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          textTransform={"capitalize"}
        >
          Request Cancel
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container>
          <Grid
            item
            xs={12}
          >
            {billItems &&
              billItems.length &&
              billItems.map((item, index) => (
                <>
                  <Box
                    key={index}
                    display="flex"
                    justifyContent={"start"}
                    my={2}
                  >
                    <Image
                      src={item.productSkuId.photos[0].imageURL ?? "/"}
                      alt={item.productSkuId.photos[0].name ?? "-"}
                      width={120}
                      height={100}
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                      unoptimized
                    />
                    <Box sx={{ ml: 3 }}>
                      <Typography
                        variant="body1"
                        color="black"
                        fontWeight={"bold"}
                      >
                        {item.product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="GrayText"
                        display={"inline-flex"}
                      >
                        Product Classification:
                      </Typography>{" "}
                      {item.productSkuId.optionValues &&
                        item.productSkuId.optionValues.length &&
                        item.productSkuId.optionValues.map((optionValue, i) => (
                          <>
                            <OptionDetail
                              key={optionValue._id}
                              data={optionValue}
                            />
                            {i !== item.productSkuId.optionValues.length - 1 && " / "}
                          </>
                        ))}
                      <br />
                      <Typography variant="body2">
                        Price:{" "}
                        <b
                          style={{
                            marginRight: "10px",
                            color: `${
                              !!item.productSkuId.priceDiscount ? "red" : "black"
                            }`,
                          }}
                        >
                          {!!item.productSkuId.priceDiscount ? (
                            <>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.productSkuId.priceDiscount ?? 0) ?? "-"}
                            </>
                          ) : (
                            <>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.productSkuId.price ?? 0) ?? "-"}
                            </>
                          )}
                        </b>
                        {!!item.productSkuId.percent && (
                          <b
                            style={{
                              textDecorationLine: "line-through",
                              display: "inline-flex",
                              color: "GrayText",
                            }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.productSkuId.price) ?? "-"}
                          </b>
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  {index !== billItems.length - 1 && <Divider />}
                </>
              ))}
          </Grid>

          <Grid
            item
            xs={12}
            my={3}
          >
            {bill.requestCancel &&
              bill.requestCancel.processingStatus === ProcessingStatus.Pending && (
                <Alert
                  severity="warning"
                  sx={{ mb: 2 }}
                >
                  Cancellation request has been submitted, awaiting confirmation.
                </Alert>
              )}
            {!bill.requestCancel ? (
              <form
                onSubmit={handleRequestCancel}
                id="request-cancel"
              >
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  color="black"
                  sx={{ display: "inline-flex" }}
                >
                  Reason Cancel
                </Typography>
                <Typography
                  color="red"
                  sx={{ display: "inline-flex" }}
                >
                  *
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={valueReason}
                  onChange={handleChange}
                >
                  {reason &&
                    reason.map((item) => (
                      <FormControlLabel
                        key={item.value}
                        value={item.value}
                        control={<Radio />}
                        label={item.label}
                      />
                    ))}
                </RadioGroup>

                {valueReason === "Other issues" && (
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    placeholder="Enter your other reason ..."
                    name="content"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "white",
                        borderRadius: 0,
                        mt: 1,
                        "& fieldset": {
                          borderColor: "#e7e7e7",
                        },
                        "&:hover fieldset": {
                          borderColor: "#e7e7e7",
                        },
                        "&.Mui-focused fieldset": {
                          border: "1px solid #e7e7e7",
                        },
                      },
                    }}
                  />
                )}
              </form>
            ) : (
              <Box>
                <Box mb={2}>
                  <Typography
                    variant="body1"
                    display={"inline-flex"}
                    mr={1}
                  >
                    Reason Cancel:
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color="black"
                    display={"inline-flex"}
                  >
                    {bill.requestCancel.reason ?? ""}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    display={"inline-flex"}
                    mr={1}
                  >
                    Cancellation Request Date:
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color="black"
                    display={"inline-flex"}
                  >
                    {new Date(bill.updatedAt).toLocaleString() ?? ""}
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ mx: 2 }}>
        <Button
          variant="contained"
          className="btn-cancel"
          sx={{ textTransform: "capitalize", my: 1, borderRadius: 0, width: "150px" }}
          onClick={handleCloseRequest}
        >
          Cancel
        </Button>
        {!bill.requestCancel && (
          <Button
            variant="contained"
            className="btn-action"
            sx={{ textTransform: "capitalize", my: 1, borderRadius: 0, width: "150px" }}
            autoFocus
            form="request-cancel"
            type="submit"
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
