/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
interface Props {
  data?: any[] | undefined;
  name?: string;
  defaultValue?: string;
  readOnly?: boolean;
}
interface Data {
  value: string;
  name: string;
}
export default function SelectComp({ data, name, defaultValue, readOnly }: Props) {
  const [value, setValue] = useState<string>(defaultValue ?? "none");
  const [list, setList] = useState<Data[]>([]);
  useEffect(() => {
    if (data) {
      setList(
        data.map((val) => ({
          name: val?.name,
          value: val?.id,
        })),
      );
    }
  }, [data]);
//   useEffect(() => {
//     if (data) {
//       if (data[0]?.firstName) {
//         setList(
//           data.map((val) => ({
//             name: val?.firstName + " " + val?.lastName,
//             value: val?.id,
//           })),
//         );
//       }
//     }
//   }, [data]);

  return (
    <Select
      readOnly={readOnly}
      required
      sx={{ width: "100%", background: "var(--white)" }}
      value={value}
      name={name}
      onChange={(e) => setValue(e.target.value)}
    >
      <MenuItem value="none">
        <em>Chọn</em>
      </MenuItem>
      {list &&
        list.map((v, i) => {
          return (
            <MenuItem
              key={i}
              value={v?.value}
            >
              {v?.name}
            </MenuItem>
          );
        })}
    </Select>
  );
}
