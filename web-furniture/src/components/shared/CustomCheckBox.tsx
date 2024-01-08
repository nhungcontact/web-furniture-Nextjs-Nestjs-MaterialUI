import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { neutral } from "@/config/theme";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function CustomCheckbox() {
  return (
    <div>
      <Checkbox
        {...label}
        sx={{
          color: `${neutral[400]}`,
        }}
      />
    </div>
  );
}

export default CustomCheckbox;
