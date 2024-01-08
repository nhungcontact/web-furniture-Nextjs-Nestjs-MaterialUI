/* eslint-disable max-lines */
"use client";
import useBillWeekly from "@/hooks/bills/useBillWeekly";
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
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const weeks = [1, 2, 3, 4];

const weekly = [0, 0, 0, 0, 0, 0, 0];
export default function WeeklyOverview() {
  const [data, setData] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    week: "1",
  });

  const { data: billWeekly } = useBillWeekly(+data.year, +data.month, +data.week);
  const [arr, setArray] = useState<number[]>(weekly);
  const handleChange = (event: SelectChangeEvent) => {
    const { value, name } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
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
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
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
    if (billWeekly && billWeekly.length) {
      setArray((prevArr) => {
        const updatedArray = [...prevArr];

        for (const val of billWeekly) {
          let index = 0; // Initialize the index variable

          switch (val.weekDayName) {
            case "Sunday":
              index = 1;
              break;
            case "Monday":
              index = 2;
              break;
            case "Tuesday":
              index = 3;
              break;
            case "Wednesday":
              index = 4;
              break;
            case "Thursday":
              index = 5;
              break;
            case "Friday":
              index = 6;
              break;
            case "Saturday":
              index = 7;
              break;
            default:
              // Handle unexpected values
              break;
          }

          console.log(index);

          updatedArray[index - 1] = val.grandTotal;
        }
        return updatedArray;
      });
    } else {
      setArray(weekly);
    }
  }, [billWeekly]);

  return (
    <>
      <Box
        display="flex"
        justifyContent={"end"}
        alignItems={"center"}
      >
        <FormControl>
          <InputLabel id="demo-year">Year</InputLabel>
          <Select
            name="year"
            label="Year"
            sx={{ mr: 2 }}
            size="small"
            labelId="demo-year"
            id="demo-simple-select"
            value={`${data.year}`}
            onChange={handleChange}
          >
            <MenuItem value={"2023"}>2023</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-month">Month</InputLabel>
          <Select
            name="month"
            label="month"
            sx={{ mr: 2 }}
            size="small"
            labelId="demo-month"
            id="demo-simple-select"
            value={`${data.month}`}
            onChange={handleChange}
          >
            {months.map((item) => (
              <MenuItem
                key={item}
                value={`${item}`}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="demo-week">Week</InputLabel>
          <Select
            name="week"
            label="Week"
            size="small"
            labelId="demo-week"
            id="demo-simple-select"
            value={data.week}
            onChange={handleChange}
          >
            {weeks.map((item) => (
              <MenuItem
                key={item}
                value={`${item}`}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <ReactApexcharts
        type="bar"
        height={205}
        options={options}
        series={[{ data: arr, name: "price" }]}
      />
    </>
  );
}
