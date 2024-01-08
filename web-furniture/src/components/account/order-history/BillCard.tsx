/* eslint-disable max-lines */
import { LightTooltip } from "@/components/shared/LightTooltipStyled";
import useBillUpdateRequestCancel from "@/hooks/bills/useBillUpdateRequestCancel";
import { BillStatus, GetBill } from "@/types/bill";
import { CurrencyExchange, ErrorOutlineOutlined } from "@mui/icons-material";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import BillDetailDialog from "./BillDetailDialog";
import ProductDetail from "./ProductDetail";
import RequestCancelDialog from "./RequestCancelDialog";
import { primary } from "@/config/theme";
type Props = {
  item: GetBill;
  indexBill: number;
};
export default function BillCard({ item, indexBill }: Props) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openRequestCancel, setOpenRequestCancel] = useState(false);

  const handleOpenDetail = () => {
    setOpenDetail(true);
  };
  const handleCloseDetail = () => {
    setOpenDetail(false);
  };
  const handleOpenRequest = () => {
    setOpenRequestCancel(true);
  };
  const handleCloseRequest = () => {
    setOpenRequestCancel(false);
  };

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <Card sx={{ borderRadius: 0, my: 2, boxShadow: "0 1px 1px 0 rgba(0,0,0,.05)" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              p={2}
            >
              <Box
                display="flex"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box>
                  <Typography
                    variant="h5"
                    display={"inline-flex"}
                    ml={1}
                  >
                    #Order
                    <b style={{ marginLeft: 8, fontSize: "16px" }}>{item.number}</b>
                  </Typography>
                  <Typography
                    display={"inline-flex"}
                    color="primary"
                    fontWeight={"bold"}
                    onClick={handleOpenDetail}
                    variant="body2"
                    ml={2}
                    sx={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Details
                  </Typography>
                </Box>

                <Box
                  display={"flex"}
                  alignItems={"center"}
                >
                  {/* <Typography
                    variant="body1"
                    sx={{ borderRight: "1px solid rgba(0,0,0,.12)", pr: 1 }}
                    display={"inline-flex"}
                  >
                    {new Date(item.updatedAt).toLocaleString()}
                  </Typography> */}
                  <Typography
                    variant="h5"
                    display={"inline-flex"}
                    mx={1}
                    color="primary.light"
                    fontWeight="bold"
                  >
                    {item.status}
                  </Typography>
                  <LightTooltip
                    title={
                      <Typography
                        variant="body2"
                        p={1}
                      >
                        {new Date(item.updatedAt).toLocaleString()}
                      </Typography>
                    }
                  >
                    <ErrorOutlineOutlined fontSize="small" />
                  </LightTooltip>
                </Box>
              </Box>
              {item.status === BillStatus.Waiting && (
                <Box textAlign={"end"}>
                  <Typography
                    textTransform="capitalize"
                    color="red"
                    variant="caption"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={handleOpenRequest}
                    fontWeight={"bold"}
                  >
                    Cancel Order
                  </Typography>
                  <RequestCancelDialog
                    openRequestCancel={openRequestCancel}
                    handleCloseRequest={handleCloseRequest}
                    billItems={item.billItems}
                    bill={item}
                  />
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              // my={2}
            >
              <Divider />
            </Grid>
            {item.billItems &&
              item.billItems.length &&
              item.billItems.map((billItem, index) => (
                <>
                  <Grid
                    key={index}
                    item
                    xs={12}
                    mt={4}
                  >
                    <ProductDetail
                      item={billItem}
                      i={index}
                      isDetail={false}
                      bill={item}
                    />
                  </Grid>
                  {index !== item.billItems.length - 1 && (
                    <Grid
                      item
                      xs={12}
                      // my={2}
                    >
                      <Divider />
                    </Grid>
                  )}
                </>
              ))}
            <Grid
              item
              xs={12}
            >
              <Box
                display="flex"
                alignItems={"center"}
                justifyContent={"end"}
                sx={{ background: `${primary[50]}`, p: 2 }}
              >
                <Typography
                  ml={2}
                  variant="h5"
                  // fontWeight={"bold"}
                >
                  Grand total:{" "}
                </Typography>
                <Typography
                  variant="h3"
                  ml={2}
                  fontWeight={"bold"}
                  color="red"
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.grandTotal)}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {item.billItems && item.billItems.length && (
        <BillDetailDialog
          data={item}
          open={openDetail}
          handleClose={handleCloseDetail}
        />
      )}
    </>
  );
}
