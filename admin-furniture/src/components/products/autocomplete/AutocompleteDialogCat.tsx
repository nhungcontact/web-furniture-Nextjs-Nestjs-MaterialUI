import CategoryDialogCreate from "@/components/categories/CategoryDialogCreate";
import useRoomFurnitureDetail from "@/hooks/room-furnitures/useRoomFurnitureDetail";
import { Category } from "@/types/category";
import { Box } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
type Props = {
  setCat: (value: string) => void;
  roomID?: string;
  cat?: Category;
};
const filter = createFilterOptions<Category>();

export default function AutocompleteDialogCat({ setCat, roomID, cat }: Props) {
  //   const { data } = useCategoryList({});
  const [value, setValue] = useState<Category | null>(null);
  const [open, toggleOpen] = useState(false);
  const { data } = useRoomFurnitureDetail(roomID);
  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState("");
  useEffect(() => {
    if (cat) {
      setValue(cat);
      setCat(cat._id);
    }
  }, [cat]);

  return (
    <>
      <Box>
        <Autocomplete
          fullWidth
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue(newValue);
              });
            } else if (newValue && newValue.inputValue) {
              toggleOpen(true);
              setDialogValue(newValue.inputValue);
            } else {
              setCat(newValue?._id as string);
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
              });
            }

            return filtered;
          }}
          id="free-solo-dialog-demo"
          options={data?.categories ? data?.categories : []}
          getOptionLabel={(option) => {
            // e.g. value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.name;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          // sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              //   helperText={
              //     data && data.categories && data.categories.length
              //       ? ""
              //       : "Not categories, Enter a category to add new category!"
              //   }
              //   error={data && data.categories && data.categories.length ? false : true}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#FFFFFF",
                },
              }}
              margin="dense"
            />
          )}
        />
        {data && (
          <CategoryDialogCreate
            handleClose={handleClose}
            open={open}
            dialogValue={dialogValue}
            room={data}
            title="Did you miss any category in our list? Please, add it!"
          />
        )}
      </Box>
    </>
  );
}
