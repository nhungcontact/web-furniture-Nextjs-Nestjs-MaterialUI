"use client";
import useBillMonthly from "@/hooks/bills/useBillMonthly";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import ReactApexcharts from "./react-apexcharts/ReactApexcharts";
// import useBillSalesPerformance from "@/hooks/bills/useBillSalesPerformance";
const weekly = [0, 0, 0, 0, 0, 0, 0];

export default function MonthlyOverview() {
  const [year, setYear] = useState("2023");
  const { data: billMontly } = useBillMonthly(+year);
  //   const { data: sales } = useBillSalesPerformance(+year);
  const [arr, setArray] = useState<number[]>(weekly);
  const theme = useTheme();
  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setYear(value);
  };

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: "40%",
        // endingShape: "rounded",
        // startingShape: "rounded",
      },
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper],
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 12,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5,
      },
    },
    dataLabels: { enabled: false },
    colors: [
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
      theme.palette.primary.main,
    ],
    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "April",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      tickPlacement: "on",
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        formatter: (value) =>
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "vnd",
          }).format(value),
      },
    },
  };

  useEffect(() => {
    if (billMontly && billMontly.length) {
      setArray((prevArr) => {
        const updatedArray = [...prevArr];

        for (const val of billMontly) {
          updatedArray[val.month - 1] = val.grandTotal;
        }

        return updatedArray;
      });
    } else {
      setArray(weekly);
    }
  }, [billMontly]);
  return (
    <>
      <Box textAlign={"end"}>
        <FormControl>
          <InputLabel id="demo-year">Year</InputLabel>
          <Select
            name="year"
            label="Year"
            sx={{ mr: 2 }}
            size="small"
            labelId="demo-year"
            id="demo-simple-select"
            value={year}
            onChange={handleChange}
          >
            <MenuItem value={"2023"}>2023</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <ReactApexcharts
        type="bar"
        height={205}
        options={options}
        series={[
          {
            data: arr ? arr : [37, 57, 45, 75, 57, 40, 65, 89],
          },
        ]}
      />
    </>
  );
}
