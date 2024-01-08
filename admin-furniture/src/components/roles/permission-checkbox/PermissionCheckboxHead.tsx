import { GroupPermission } from "@/types/group-permission";
import { Box, Checkbox, TableCell, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  item: GroupPermission;
  disabled: boolean;
  checkedAll: string[];
  setCheckedAll: (data: string[]) => void;
  isSelected: boolean;
}
export default function PermissionCheckboxHead({
  item,
  disabled,
  setCheckedAll,
  checkedAll,
  isSelected,
}: Props) {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    if (item.permissions) {
      const res = item.permissions.map((v) => v?._id);
      if (checkedAll && checkedAll.length) {
        if (res) {
          const ids: string[] = checkedAll.concat(res);
          console.log(
            "ids",
            ids.filter((val, index) => ids.indexOf(val) === index),
          );
          setCheckedAll(ids.filter((val, index) => ids.indexOf(val) === index));
        }
      } else {
        // const checkedSelect = checkedAll.map((val) => res.includes(val));

        setCheckedAll(checkedAll.filter((v) => !res.includes(v)));
      }
    }
  }, [checked]);

  //   console.log(checkedAll);

  useEffect(() => {
    if (isSelected) {
      setChecked(true);
    }
  }, [isSelected]);
  return (
    <TableCell sx={{ whiteSpace: "nowrap", minWidth: "250px" }}>
      <Box
        className="display-sb"
        justifyContent="flex-start"
        gap="12px"
      >
        <Checkbox
          sx={{ p: "0" }}
          checked={checked}
          onClick={() => setChecked(!checked)}
          disabled={disabled}
        />
        <Typography sx={{ fontWeight: "bold" }}>{item?.name}</Typography>
      </Box>
    </TableCell>
  );
}
