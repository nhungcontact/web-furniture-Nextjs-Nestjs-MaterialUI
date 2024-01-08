import { BillItem } from "@/types/bill-item";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import Image from "next/image";
import OptionDetail from "./OptionDetail";

type Props = {
  data: BillItem;
  index: number;
};

export default function BillTableBody({ data, index }: Props) {
  return (
    <>
      {!!data.productSkuId && !!data.productSkuId._id && (
        <TableRow
          hover
          sx={{
            "&:last-of-type td, &:last-of-type th": {
              border: 0,
            },
          }}
        >
          <TableCell>
            <Typography variant="body1">{index + 1}</Typography>
          </TableCell>
          <TableCell
            component="th"
            scope="row"
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              textAlign={"start"}
            >
              {!!data.productSkuId.photos && !!data.productSkuId.photos.length && (
                <Image
                  src={data.productSkuId.photos[0].imageURL ?? "/"}
                  alt={data.productSkuId.photos[0].name ?? "-"}
                  width={100}
                  height={100}
                  unoptimized
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                    marginRight: 20,
                  }}
                />
              )}
              <Box>
                <Typography
                  fontWeight={600}
                  variant="body1"
                  noWrap
                  display={"inline-flex"}
                >
                  {data.product.name}
                </Typography>
                <br />
                {!!data.productSkuId.optionValues &&
                  !!data.productSkuId.optionValues.length &&
                  data.productSkuId.optionValues.map((item, i) => (
                    <>
                      <OptionDetail
                        key={item._id}
                        item={item}
                      />
                      {i !== data.productSkuId.optionValues.length - 1 && " / "}
                    </>
                  ))}
              </Box>
            </Box>
          </TableCell>

          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
              color={data.productSkuId.priceDiscount ? "red" : ""}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "vnd",
              }).format(data.price) ?? "-"}
            </Typography>
            {!!data.productSkuId.priceDiscount && (
              <>
                <Typography
                  sx={{ textDecorationLine: "line-through" }}
                  variant="body1"
                  fontWeight="bold"
                >
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "vnd",
                  }).format(data.productSkuId.price)}
                </Typography>
              </>
            )}
          </TableCell>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
            >
              x {data.quantity ?? 0}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography
              variant="body1"
              fontWeight="bold"
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "vnd",
              }).format(data.totalPrice) ?? 0}
            </Typography>
          </TableCell>
        </TableRow>
      )}
      {!data.productSkuId && "Error"}
    </>
  );
}
