"use client";
import {
  Box,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function LoadingPage() {
  return (
    <TableContainer
      sx={{
        padding: "0 16px 16px 16px",
        overflowX: "auto",
        background: "var(--white)",
        borderRadius: "0px 0px 10px 10px",
        height: "60vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          mt: "32px",
          p: "18px 16px 0",
          columnGap: "10px",
        }}
      >
        {Array.from(Array(5).keys()).map((item) => (
          <Skeleton
            key={item}
            width={120}
            height={40}
          />
        ))}
      </Box>
      <Box sx={{ p: "18px 16px 0" }}>
        <Skeleton
          width={120}
          height={60}
        />
      </Box>
      <Box sx={{ p: "0px 16px 0", display: "flex", justifyContent: "space-between" }}>
        <Skeleton
          width={120}
          height={60}
        />
        <Box sx={{ display: "flex", columnGap: "10px" }}>
          <Skeleton
            width={120}
            height={60}
          />
          <Skeleton
            width={80}
            height={60}
          />
        </Box>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            {Array.from(Array(7).keys()).map((item) => (
              <TableCell
                key={item}
                align="center"
                sx={{ whiteSpace: "nowrap" }}
              >
                <Skeleton
                  width={80}
                  height={30}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(Array(3).keys()).map((r) => (
            <TableRow key={"renderRow_" + r}>
              {Array.from(Array(8).keys()).map((item) => (
                <TableCell
                  key={item}
                  align="center"
                  sx={{ whiteSpace: "nowrap" }}
                >
                  <Skeleton
                    width={80}
                    height={30}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LoadingPage;
