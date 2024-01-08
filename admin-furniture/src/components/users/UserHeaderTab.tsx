import { UserType } from "@/types/user";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
type Props = {
  getType: (type: UserType) => void;
  type?: UserType;
};
export default function UserHeaderTab({ getType, type }: Props) {
  const [value, setValue] = useState<UserType>(type ? type : UserType.Personnel);

  const handleChange = (event: SyntheticEvent, newValue: UserType) => {
    setValue(newValue);
    getType(newValue);
  };
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab
            label={
              <Typography
                textTransform="capitalize"
                fontWeight="bold"
                variant="body1"
              >
                {UserType.Personnel}
              </Typography>
            }
            value={UserType.Personnel}
          />
          <Tab
            label={
              <Typography
                textTransform="capitalize"
                fontWeight="bold"
                variant="body1"
              >
                {UserType.Customer}
              </Typography>
            }
            value={UserType.Customer}
          />
        </Tabs>
      </Box>
    </>
  );
}
