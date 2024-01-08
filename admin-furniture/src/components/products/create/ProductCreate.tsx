/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useProductSkuCreate from "@/hooks/product-skus/useProductSkuCreate";
import { ProductSkuCreateInput } from "@/types/product-sku";
import { generateRandomSku } from "@/utils/number-sku-random";
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import CreateInformation from "./CreateInformation";
import CreateDetail from "./CreaterDetail";
import { useSnackbar } from "notistack";

const steps = ["Product information", "Product Variant"];
export default function ProductCreate() {
  const { enqueueSnackbar } = useSnackbar();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const { trigger: createProductSku } = useProductSkuCreate();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNextMain = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleNext = (data?: ProductSkuCreateInput[]) => {
    if (activeStep === steps.length - 1) {
      if (!!data && !!data.length) {
        const filteredProducts = data.filter(
          (product) =>
            product.quantityInStock !== 0 &&
            product.content !== "" &&
            product.photos.length !== 0 &&
            product.optionValues.length !== 0 &&
            product.price !== 0,
          // product.priceDiscount !== 0 &&
          // product.percent !== 0,
        );
        console.log(filteredProducts);

        const allPropertiesValid = filteredProducts.every(
          (obj) =>
            obj.price !== 0 &&
            obj.quantityInStock !== 0 &&
            obj.photos.length !== 0 &&
            obj.optionValues.length !== 0,
        );

        if (allPropertiesValid) {
          let index = 0;
          for (const val of filteredProducts) {
            const productId = localStorage.getItem("productId");
            const numberSKU = generateRandomSku();
            if (productId) {
              const formData = new FormData();
              formData.append("product", productId);
              formData.append("numberSKU", numberSKU as string);
              formData.append("price", val.price as any);
              formData.append("priceDiscount", val.priceDiscount as any);
              formData.append("percent", val.percent as any);
              formData.append("quantitySold", val.quantitySold as any);
              formData.append("quantityInStock", val.quantityInStock as any);
              formData.append("content", val.content as string);
              formData.append("optionValues", val.optionValues as any);
              val.photos.forEach((photo) => {
                formData.append("photos", photo as any);
              });
              createProductSku({
                body: formData as any,
              })
                .then(() => {
                  if (index === filteredProducts.length) {
                    enqueueSnackbar("successfully", {
                      variant: "success",
                      anchorOrigin: {
                        vertical: "top",
                        horizontal: "center",
                      },
                    });
                    handleNextMain();
                  }
                })
                .catch((e) => {
                  enqueueSnackbar(e?.message, {
                    variant: "error",
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: "center",
                    },
                  });
                });
            }
            index++;
          }
        } else {
          enqueueSnackbar("Please enter complete information!", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        }
      } else {
        enqueueSnackbar("Please enter product variant!", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      }
    } else {
      handleNextMain();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <>
        <Paper sx={{ px: 2, py: 4, mb: 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};

              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step
                  key={label}
                  {...stepProps}
                >
                  <StepLabel>
                    <Typography variant="body1">{label}</Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Paper>
        {activeStep === steps.length ? (
          <>
            <Box
              display={"flex"}
              alignItems={"center"}
            >
              <Typography sx={{ mr: 1 }}>
                All steps completed - you&apos;re finished.
              </Typography>
              <Link href={"/products"}>
                <Typography color={"primary"}>List Product</Typography>
              </Link>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button
                className="btn-action"
                onClick={handleReset}
              >
                reset
              </Button>
            </Box>
          </>
        ) : (
          <>
            {activeStep === 0 && <CreateInformation handleNext={handleNext} />}
            {activeStep === 1 && <CreateDetail handleNext={handleNext} />}
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1, width: "100px" }}
                className="btn-cancel"
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              {/* <Button
                variant="contained"
                className="btn-action"
                onClick={() => handleNext()}
                sx={{ width: "100px" }}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </Box>
          </>
        )}
      </>
    </>
  );
}
