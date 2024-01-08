import { primary } from "@/config/theme";
import useCategoryList from "@/hooks/categories/useCategoryList";
import { GetCategory } from "@/types/category";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
type Props = {
  getCat: (v: string) => void;
};
export default function SelectionFilterProduct({ getCat }: Props) {
  const { data } = useCategoryList({});
  const [listCategory, setListCategory] = useState<GetCategory[]>([]);
  const [value, setValue] = useState<string>(
    data && data.items.length ? data.items[0]._id : "",
  );
  const handleChangeCat = (e: SelectChangeEvent<string>) => {
    setValue(e.target.value as string);
    getCat(e.target.value as string);
  };
  console.log("value", value);
  useEffect(() => {
    if (data && data.items) {
      setListCategory(data.items);
    }
  }, [data]);
  return (
    <>
      <Select
        fullWidth
        // disableUnderline
        value={value}
        onChange={handleChangeCat}
        sx={{
          height: "50px",
          background: primary[400],
          color: "white",
          //   borderRadius: "15px",
          "&.MuiOutlinedInput-root": {
            height: "50px",
            background: "#F2EBFF",
          },
          ".MuiOutlinedInput-notchedOutline": { border: 0 },
          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          ":focus-visible": {
            outline: "none",
          },
        }}
      >
        {!!listCategory &&
          !!listCategory.length &&
          listCategory.map((item) => (
            <MenuItem
              key={item._id}
              value={item._id}
              sx={{ justifyContent: "start" }}
            >
              <Typography
                variant="body1"
                fontWeight={"bold"}
              >
                {item.name}
              </Typography>
            </MenuItem>
          ))}
      </Select>
    </>
  );
}
