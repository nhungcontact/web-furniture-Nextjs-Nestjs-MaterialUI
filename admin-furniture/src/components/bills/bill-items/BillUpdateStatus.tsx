/* eslint-disable max-lines */
import useBillUpdate from "@/hooks/bills/useBillUpdate";
import { BillStatus, GetBill } from "@/types/bill";
import { setStatusBill } from "@/utils/setStatusBill";
import { Verified } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useRouter } from "next-intl/client";
import { useState } from "react";
type Props = {
  data: GetBill;
};

export default function BillUpdateStatus({ data }: Props) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(setStatusBill(data.status));
  const { trigger: updateStatus } = useBillUpdate(data._id);

  const handleNext = (value: number) => {
    let status = "" as BillStatus;
    let isUpdate = false;
    if (value === 1) {
      status = BillStatus.Processing;
      isUpdate = true;
    }
    if (value === 2) {
      status = BillStatus.Shipping;
      isUpdate = true;
    }
    if (value === 3) {
      status = BillStatus.Success;
      isUpdate = true;
    }
    if (isUpdate && value !== 0) {
      updateStatus({
        body: {
          status: status,
        },
      })
        .then(() => {
          setActiveStep((prevActiveStep) => prevActiveStep && prevActiveStep + 1);
          router.push("/bills");
        })
        .catch((e) => {
          console.log(e?.message);
        });
    }
  };

  return (
    <Box sx={{ maxWidth: "100vh" }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        <Step>
          <StepLabel>
            <Typography
              variant="body1"
              mb={1}
            >
              {BillStatus.Waiting}
            </Typography>
            {activeStep && activeStep > 0 && (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Verified
                    color="success"
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body1">
                    Waiting
                    {activeStep === 1 &&
                      " on " + new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </>
            )}
          </StepLabel>
          <StepContent>
            <Typography variant="body1">
              {new Date(data.createdAt).toLocaleString()}
            </Typography>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography variant="body1">{BillStatus.Processing}</Typography>
            {activeStep && activeStep > 1 && (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Verified
                    color="success"
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body1">
                    Confirmed processing{" "}
                    {activeStep === 2 &&
                      " on " + new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </>
            )}
          </StepLabel>
          <StepContent>
            <Typography variant="body1">
              {new Date(data.updatedAt).toLocaleString()}
            </Typography>
            <Button
              size="small"
              variant="contained"
              disabled={data.requestCancel ? true : false}
              onClick={() => handleNext(activeStep)}
              sx={{ mt: 1, mr: 1 }}
              className="btn-action"
            >
              Confirm
            </Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography variant="body1">{BillStatus.Shipping}</Typography>
            {activeStep && activeStep > 2 && (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Verified
                    color="success"
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body1">
                    Confirmed shipping
                    {activeStep === 3 &&
                      " on " + new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </>
            )}
          </StepLabel>
          <StepContent>
            <Typography variant="body1">
              {new Date(data.updatedAt).toLocaleString()}
            </Typography>
            <Button
              size="small"
              variant="contained"
              disabled={data.requestCancel ? true : false}
              onClick={() => handleNext(activeStep)}
              sx={{ mt: 1, mr: 1 }}
              className="btn-action"
            >
              Confirm
            </Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Typography variant="body1">{BillStatus.Success}</Typography>
            {activeStep && activeStep > 3 && (
              <>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Verified
                    color="success"
                    fontSize="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body1">
                    Delivered on{" "}
                    {activeStep === 4 &&
                      " on " + new Date(data.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </>
            )}
          </StepLabel>
          <StepContent>
            <Typography variant="body1">
              {new Date(data.updatedAt).toLocaleString()}
            </Typography>
            <Button
              size="small"
              variant="contained"
              disabled={data.requestCancel ? true : false}
              onClick={() => handleNext(activeStep)}
              sx={{ mt: 1, mr: 1 }}
              className="btn-action"
            >
              Confirm
            </Button>
          </StepContent>
        </Step>
      </Stepper>

      {activeStep === 4 && (
        <Paper
          square
          elevation={0}
          sx={{ py: 3, display: "flex", alignItems: "center" }}
        >
          <Verified
            color="success"
            fontSize="large"
            sx={{ mr: 1 }}
          />
          <Box>
            <Typography
              variant="body1"
              noWrap
              mb={1}
            >
              Order successfully delivered on
              <b>{" " + new Date(data.updatedAt).toLocaleString()}</b>
            </Typography>
            <Typography
              variant="body1"
              noWrap
            >
              Total Price
              <b>
                {" " +
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "vnd",
                  }).format(data.price) ?? "-"}
              </b>
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
