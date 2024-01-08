/* eslint-disable max-lines */
"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ApexOptions } from "apexcharts";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import ReactApexcharts from "./react-apexcharts/ReactApexcharts";
import useBillRevenueBetweenDate from "@/hooks/bills/useBillRevenueBetweenDate";

export default function DatesOverview() {
  const [data, setData] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(7, "day"),
  });

  const { data: datesBetween } = useBillRevenueBetweenDate(
    data.startDate.toDate(),
    data.endDate.toDate(),
  );

  const generateDateRange = (startDate: Dayjs, endDate: Dayjs) => {
    const result = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      result.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }
    return result;
  };

  const theme = useTheme();

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
      },
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper],
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
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
      categories: generateDateRange(data.startDate, data.endDate),
      tickPlacement: "on",
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: true,
      tickAmount: 5,
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

  const dateRange = generateDateRange(data.startDate, data.endDate);

  const series = [
    {
      name: "totalOrders",
      data: dateRange.map((date) => ({
        x: date,
        y:
          datesBetween?.find((item) => dayjs(item.date).format("YYYY-MM-DD") === date)
            ?.totalOrders || 0,
      })),
    },
    {
      name: "totalProducts",
      data: dateRange.map((date) => ({
        x: date,
        y:
          datesBetween?.find((item) => dayjs(item.date).format("YYYY-MM-DD") === date)
            ?.totalProducts || 0,
      })),
    },
    {
      name: "totalProfit",
      data: dateRange.map((date) => ({
        x: date,
        y:
          datesBetween?.find((item) => dayjs(item.date).format("YYYY-MM-DD") === date)
            ?.totalProfit || 0,
      })),
    },
    {
      name: "totalRevenue",
      data: dateRange.map((date) => ({
        x: date,
        y:
          datesBetween?.find((item) => dayjs(item.date).format("YYYY-MM-DD") === date)
            ?.totalRevenue || 0,
      })),
    },
  ];

  console.log("series:", series);

  return (
    <>
      <Box
        display="flex"
        justifyContent={"end"}
        alignItems={"center"}
        mb={3}
      >
        <Box mr={3}>
          <Typography
            fontWeight={"bold"}
            variant="body1"
          >
            Start Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                slotProps={{ textField: { fullWidth: true } }}
                value={data.startDate}
                onChange={(newValue) =>
                  setData((prev) => ({
                    ...prev,
                    startDate: dayjs(newValue), // Convert newValue to a Dayjs instance
                  }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography
            fontWeight={"bold"}
            variant="body1"
          >
            End Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                slotProps={{ textField: { fullWidth: true } }}
                value={data.endDate}
                onChange={(newValue) =>
                  setData((prev) => ({
                    ...prev,
                    endDate: dayjs(newValue), // Convert newValue to a Dayjs instance
                  }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
      </Box>
      <ReactApexcharts
        type="bar"
        height={205}
        options={options}
        series={series}
      />
    </>
  );
}
