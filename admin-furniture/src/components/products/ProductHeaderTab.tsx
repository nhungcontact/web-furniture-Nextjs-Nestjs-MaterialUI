import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent } from "react";
type Props = {
  handleChange: (event: SyntheticEvent, newValue: string) => void;
  type?: boolean;
};
export default function ProductHeaderTab({ handleChange, type }: Props) {
  console.log("False", type);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={type ? type : "false"}
          onChange={handleChange}
        >
          <Tab
            label={
              <Typography
                textTransform="capitalize"
                fontWeight="bold"
                variant="body1"
              >
                Products In Stock
              </Typography>
            }
            value={"false"}
          />
          <Tab
            label={
              <Typography
                textTransform="capitalize"
                fontWeight="bold"
                variant="body1"
              >
                Products not used
              </Typography>
            }
            value={"true"}
          />
        </Tabs>
      </Box>
    </>
  );
}
