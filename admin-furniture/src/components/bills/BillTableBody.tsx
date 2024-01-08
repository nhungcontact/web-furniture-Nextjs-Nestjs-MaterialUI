import { BillPaymentMethod, BillStatus, GetBill } from "@/types/bill";
import {
  AccountCircle,
  Check,
  Close,
  HourglassFull,
  LocalShipping,
} from "@mui/icons-material";
import { Box, Button, Chip, TableCell, TableRow, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  data: GetBill;
  index: number;
};

export default function BillTableBody({ data, index }: Props) {
  const router = useRouter();

  const handleOpenBill = () => {
    router.push(`/bills/bill-items/${data._id}`);
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
      <TableCell>
        <Typography variant="body1">{index + 1 ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">#{data.number ?? "-"}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          <Box
            display={"flex"}
            alignItems={"center"}
            textAlign={"start"}
          >
            {data.user.avatar && (
              <Image
                src={data.user.avatar.imageURL ?? "/"}
                alt={data.user.avatar.name ?? "-"}
                width={100}
                height={100}
              />
            )}
            {!data.user.avatar && <AccountCircle fontSize="large" />}
            <Typography
              fontWeight={600}
              variant="body1"
              ml={2}
              noWrap
            >
              {data.user.username ?? "-"}
            </Typography>
          </Box>
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(data.grandTotal) ?? "-"}
        </Typography>
      </TableCell>{" "}
      <TableCell>
        <Typography variant="body1">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(data.promotionPrice ?? 0)}
        </Typography>
      </TableCell>{" "}
      <TableCell>
        <Typography variant="body1">
          {data.paymentMethod === BillPaymentMethod.Cod
            ? "Payment on delivery"
            : "Payment with card"}
        </Typography>
      </TableCell>{" "}
      <TableCell>
        <Typography
          variant="body1"
          noWrap
        >
          {new Date(data.createdAt).toLocaleString() ?? "-"}
        </Typography>
      </TableCell>
      <TableCell>
        {data.status === BillStatus.Cancel && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<Close />}
            label={data.status}
          />
        )}
        {data.status === BillStatus.Processing && (
          <Chip
            variant="outlined"
            color="info"
            size="small"
            icon={<Close />}
            label={data.status}
          />
        )}
        {data.status === BillStatus.Success && (
          <Chip
            variant="outlined"
            color="success"
            size="small"
            icon={<Check />}
            label={data.status}
          />
        )}
        {data.status === BillStatus.Shipping && (
          <Chip
            variant="outlined"
            color="info"
            size="small"
            icon={<LocalShipping />}
            label={data.status}
          />
        )}
        {data.status === BillStatus.Waiting && !data.requestCancel && (
          <Chip
            variant="outlined"
            color="warning"
            size="small"
            icon={<HourglassFull />}
            label={data.status}
          />
        )}
        {data.requestCancel && data.status !== BillStatus.Cancel && (
          <Chip
            variant="outlined"
            color="error"
            size="small"
            icon={<Close />}
            label="Request cancel"
          />
        )}
      </TableCell>
      <TableCell>
        <Button
          className="btn-table"
          onClick={handleOpenBill}
        >
          Detail
        </Button>
      </TableCell>
    </TableRow>
  );
}
