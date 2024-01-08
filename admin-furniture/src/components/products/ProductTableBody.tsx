/* eslint-disable max-lines */
import useProductUpdate from "@/hooks/products/useProductUpdate";
import { GetProduct } from "@/types/product";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import ProductDialogUpdate from "./ProductDialogUpdate";

type Props = {
  product: GetProduct;
  index: number;
  onUpdate: (name?: boolean) => void;
  //   onClickSelect: (event: React.MouseEvent<unknown>, product: GetProduct) => void;
  //   isItemSelected?: boolean;
};

export default function ProductTableBody({
  product,
  index, //   onClickSelect,
  //   isItemSelected,
  onUpdate,
}: Props) {
  const { trigger: updateProduct } = useProductUpdate(product._id);
  //   const { trigger: removeProduct } = useProductRemove(product._id);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  //   const { trigger: remove } = useProductRemove(product._id);
  //   const handleClick = (event: React.MouseEvent<unknown>, product: GetProduct) => {
  //     onClickSelect(event, product);
  //   };
  const handleOpenUpdate = () => {
    setOpen(true);
  };
  const handleCloseUpdate = () => {
    setOpen(false);
  };
  const handleOpenDetail = () => {
    router.push(`/products/product-details/${product._id}`);
  };

  const handleAction = (name: string) => {
    updateProduct({
      body: {
        isHidden: name === "Hidden" ? true : false,
      },
    })
      .then(() => {
        enqueueSnackbar("Hidden successfully!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        onUpdate(name === "Active" ? undefined : true);
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
  };

  const totalQuantity = product?.productSkus?.reduce((accumulator, item) => {
    // Assuming each item has a property 'quantitySold'
    return accumulator + item.quantityInStock;
  }, 0);

  return (
    <>
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
        <TableCell>
          <Typography
            fontWeight={600}
            variant="body1"
            ml={2}
            noWrap
          >
            {product.name}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{product?.category.name ?? "-"}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{product?.roomFurniture.name ?? "-"}</Typography>
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            sx={{
              width: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.description ?? "-"}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            sx={{
              width: "200px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.description ?? "-"}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            // fontWeight={600}
            variant="body1"
            noWrap
          >
            {product?.productSkus?.length ?? "0"}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            // fontWeight={600}
            variant="body1"
            noWrap
          >
            {totalQuantity ?? "0"}
          </Typography>
        </TableCell>
        <TableCell
          sx={{
            border: "none",
            position: "sticky",
            bgcolor: "#f8f8f8",
            right: 0,
            minWidth: "150px",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              className="btn-table"
              size="small"
              onClick={handleOpenUpdate}
              sx={{ mr: 3 }}
            >
              Update
            </Button>
            <Button
              className="btn-table"
              size="small"
              onClick={handleOpenDetail}
              sx={{ mr: 3 }}
            >
              Detail
            </Button>

            <Button
              className="btn-table"
              size="small"
              onClick={() =>
                handleAction(product.isHidden === false ? "Hidden" : "Active")
              }
            >
              {product.isHidden === false ? "Hidden" : "Active"}
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <ProductDialogUpdate
        open={open}
        handleClose={handleCloseUpdate}
        data={product}
        onUpdate={onUpdate}
      />
    </>
  );
}
