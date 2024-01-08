/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductSkuCreateInput } from "@/types/product-sku";
import { Close } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { ChangeEvent } from "react";
type Props = {
  handleDetailChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    val: number,
  ) => void;
  handleFileRemove: (i: number, index: number) => void;
  index: number;
  item: ProductSkuCreateInput;
};
export default function UploadFile({
  handleDetailChange,
  handleFileRemove,
  index,
  item,
}: Props) {
  console.log("index", index);
  return (
    <Box
      sx={{
        textAlign: "center",
        border: ".125rem dashed rgba(231,234,243)",
        padding: "3rem 3rem",
        background: "#FFFFFF",
      }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="start"
      >
        {item &&
          item.photos.length > 0 &&
          item.photos.map((photo, i) => (
            <Grid
              item
              xs={6}
              md={3}
              key={i}
              sx={{
                position: "relative",
              }}
            >
              <Box
                sx={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
              >
                <Image
                  src={URL.createObjectURL(photo as any) ?? "/"}
                  alt="Profile Pic"
                  width={240}
                  height={200}
                  style={{
                    width: "-webkit-fill-available",
                  }}
                />
              </Box>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleFileRemove(i, index)}
                sx={{
                  position: "absolute",
                  top: "30px",
                  right: "-16px",
                  padding: "2px",
                  borderRadius: "50px",
                  minWidth: "14px",
                }}
              >
                <Close />
              </Button>
            </Grid>
          ))}
      </Grid>
      <Box sx={{ my: 6 }}>
        <Button
          component="label"
          variant="contained"
          className="btn-action"
        >
          Upload Photo
          <input
            hidden
            type="file"
            multiple
            name="photos"
            onChange={(e) => handleDetailChange(e, index)}
            accept="image/png, image/jpeg"
          />
        </Button>
        <Typography
          variant="body1"
          sx={{ marginTop: 2 }}
          color="GrayText"
        >
          Allowed PNG or JPEG. Max size of 800K.
        </Typography>
      </Box>
    </Box>
  );
}
