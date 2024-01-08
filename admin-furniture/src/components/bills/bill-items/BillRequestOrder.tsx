/* eslint-disable max-lines */
import useBillUpdateRequestCancel from "@/hooks/bills/useBillUpdateRequestCancel";
import { BillUpdateInput, GetBill } from "@/types/bill";
import { ProcessingStatus, RequestCancel } from "@/types/request-cancel";
import { setRequestOrderBill } from "@/utils/setRequestOrderBill";
import { Verified } from "@mui/icons-material";
import {
  Box,
  Button,
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

export default function BillRequestOrder({ data }: Props) {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(
    setRequestOrderBill(data.requestCancel ? data.requestCancel.processingStatus : ""),
  );
  const { trigger: updateRequestCancel } = useBillUpdateRequestCancel(data._id);

  const handleNext = (value: number) => {
    let status = "" as ProcessingStatus;
    let isUpdate = false;
    if (value === 1) {
      status = ProcessingStatus.Approved;
      isUpdate = true;
    }
    if (value === 2) {
      status = ProcessingStatus.Denied;
      isUpdate = true;
    }

    if (isUpdate && value !== 0) {
      updateRequestCancel({
        body: {
          requestCancel: {
            ...data.requestCancel,
            processingStatus: status,
          } as RequestCancel,
        } as BillUpdateInput,
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
              {ProcessingStatus.Pending}
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
                    {ProcessingStatus.Pending}
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
            <Typography variant="body1">{ProcessingStatus.Approved}</Typography>
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
                    {ProcessingStatus.Approved}
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
              //   disabled={data.requestCancel ? true : false}
              onClick={() => handleNext(activeStep)}
              sx={{ mt: 1, mr: 1 }}
              className="btn-action"
            >
              Confirm
            </Button>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
}
