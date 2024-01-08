import useBillList from "@/hooks/bills/useBillList";
import useProductList from "@/hooks/products/useProductList";
import { BillStatus } from "@/types/bill";
import { ThemeColor } from "@/types/style";
import { Start } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
interface DataType {
  stats: string;
  title: string;
  color: ThemeColor;
  icon: ReactElement;
}

function useSalesData(): DataType[] {
  const { data: bill } = useBillList({ limit: 1000, status: BillStatus.Success });
  const [totalUser, setTotalUser] = useState<number>();
  const { data: products } = useProductList({ limit: 10000, isHidden: false });

  useEffect(() => {
    if (bill && bill.items && bill.items.length > 0) {
      const uniqueUsers = new Set();

      bill.items.forEach((item) => {
        uniqueUsers.add(item.user._id);
      });

      const totalUniqueUsers = uniqueUsers.size;
      setTotalUser(totalUniqueUsers);

      console.log("Total unique users:", totalUniqueUsers);
    } else {
      console.log("No valid bill or items found.");
      setTotalUser(0);
    }
  }, [bill]);

  return [
    {
      stats:
        bill && bill.items
          ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "vnd",
            }).format(bill.items.reduce((total, bill) => total + bill.price, 0))
          : "0",
      title: "Sales",
      color: "primary",
      icon: <Start sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: `${totalUser}`,
      title: "Customers",
      color: "success",
      icon: <Start sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats: `${products ? products.total : 0}`,
      color: "warning",
      title: "Products",
      icon: <Start sx={{ fontSize: "1.75rem" }} />,
    },
    {
      stats:
        bill && bill.items
          ? new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "vnd",
            }).format(bill.items.reduce((total, bill) => total + bill.grandTotal, 0))
          : "0",
      color: "info",
      title: "Revenue",
      icon: <Start sx={{ fontSize: "1.75rem" }} />,
    },
  ];
}

function useRenderStats() {
  const salesData = useSalesData();
  return salesData.map((item: DataType, index: number) => (
    <Grid
      item
      xs={12}
      sm={3}
      key={index}
    >
      <Box
        key={index}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "common.white",
            backgroundColor: `${item.color}.main`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
}
export default function StatisticsCard() {
  return (
    <Card>
      <CardHeader
        title="Statistics Card"
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid
          container
          spacing={[5, 0]}
        >
          {useRenderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
}
