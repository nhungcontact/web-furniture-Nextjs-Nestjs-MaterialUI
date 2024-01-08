import { Promotion, PromotionStatus } from "@/types/promotion";
import { CheckOutlined, CloseOutlined } from "@mui/icons-material";
import { Button, Chip, TableCell, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import PromotionDialogCreate from "./PromotionDialogCreate";
import { useSearchParams } from "next/navigation";

type Props = {
  data: Promotion;
  index: number;
};

export default function BlogTableBody({ data, index }: Props) {
  const searchParam = useSearchParams();
  const yourParamValue = searchParam.get("dateApply");
  const [view, setView] = useState(false);

  const [open, toggleOpen] = useState(false);

  const handlePromotionUpdate = (name: string) => {
    if (name === "view") {
      setView(true);
    }
    toggleOpen(true);
  };
  const handleClose = () => {
    toggleOpen(false);
    setView(false);
  };

  return (
    <TableRow
      hover
      sx={{
        "&:last-of-type td, &:last-of-type th": {
          border: 0,
        },
      }}
    >
      <TableCell padding="checkbox">
        <Typography variant="body1">{index + 1}</Typography>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
      >
        <Typography variant="body1">{data.name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.couponCode ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.quantity ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(data.priceMinimumApply ?? 0)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">{data.type ?? "-"}</Typography>
      </TableCell>
      {!!data.percentDiscount && (
        <TableCell>
          <Typography variant="body1">{data.percentDiscount ?? 0}%</Typography>
        </TableCell>
      )}
      {!!data.priceMaximumByPercent && (
        <TableCell>
          <Typography variant="body1">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "vnd",
            }).format(data.priceMaximumByPercent) ?? "-"}
          </Typography>
        </TableCell>
      )}
      {!!data.numberDiscountByNumber && (
        <TableCell>
          <Typography variant="body1">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "vnd",
            }).format(data.numberDiscountByNumber) ?? "-"}
          </Typography>
        </TableCell>
      )}
      <TableCell>
        <Typography variant="body1">
          {new Date(data.dateExpire).toLocaleString() ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {new Date(data.dateApply).toLocaleString() ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        {data.status === PromotionStatus.Active && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<CheckOutlined />}
            label={PromotionStatus.Active}
          />
        )}
        {data.status === PromotionStatus.Inactive && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<CloseOutlined />}
            label={PromotionStatus.Inactive}
          />
        )}
      </TableCell>
      {yourParamValue ? (
        <TableCell>
          <Button
            className="btn-table"
            onClick={() => handlePromotionUpdate("update")}
          >
            Update
          </Button>
        </TableCell>
      ) : (
        <TableCell>
          <Button
            className="btn-table"
            onClick={() => handlePromotionUpdate("view")}
          >
            View
          </Button>
        </TableCell>
      )}

      <PromotionDialogCreate
        handleClose={handleClose}
        open={open}
        data={data}
        view={view}
      />
    </TableRow>
  );
}
