import { Box, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent } from "react";
type Props = {
  handleChange: (event: SyntheticEvent, newValue: string) => void;
  type?: string;
};
export default function PromotionHeaderTab({ handleChange, type }: Props) {
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={type ? type : "in-use"}
          onChange={handleChange}
        >
          <Tab
            label={
              <Typography
                textTransform="capitalize"
                fontWeight="bold"
                variant="body1"
              >
                Not Applied
              </Typography>
            }
            value={"not-applied"}
          />
          <Tab
            label={
              <Typography
                textTransform="capitalize"
                fontWeight="bold"
                variant="body1"
              >
                currently applying
              </Typography>
            }
            value={"in-use"}
          />
          <Tab
            label={
              <Typography
                textTransform="capitalize"
                fontWeight="bold"
                variant="body1"
              >
                Expired
              </Typography>
            }
            value={"expired"}
          />
          <Tab
            label={
              <Typography
                textTransform="capitalize"
                fontWeight="bold"
                variant="body1"
              >
                Sold out
              </Typography>
            }
            value={"sold-out"}
          />
        </Tabs>
      </Box>
    </>
  );
}
