import { InputAdornment } from "@mui/material";
import Image from "next/image";
import SearchInput from "../shared/SearchInput";
type Props = {
  defaultValueSearch?: string;
  getValueSearch: (value?: string) => void;
};
export default function BlogSearch({ defaultValueSearch, getValueSearch }: Props) {
  const handleSearchChange = (value?: string) => {
    getValueSearch(value);
  };
  return (
    <SearchInput
      fullWidth
      size="small"
      placeholder="Search"
      sx={{
        "& .MuiOutlinedInput-input": {
          "::placeholder": {
            color: "black",
            fontSize: "15px",
          },
        },
      }}
      endAdornment={
        <InputAdornment position="end">
          <Image
            src="/images/magnifying-glass.png"
            height={22}
            width={22}
            alt="Search"
          />
        </InputAdornment>
      }
      //   variant="outlined"
      onValueChange={handleSearchChange}
      defaultValue={defaultValueSearch}
    />
  );
}
