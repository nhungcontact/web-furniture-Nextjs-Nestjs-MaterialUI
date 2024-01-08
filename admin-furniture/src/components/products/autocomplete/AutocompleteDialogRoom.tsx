import RoomDialogCreate from "@/components/room-furnitures/RoomDialogCreate";
import useRoomFurnitureList from "@/hooks/room-furnitures/useRoomFurnitureList";
import { RoomFurniture } from "@/types/room-furniture";
import { Box } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
type Props = {
  setRoom: (value: string) => void;
  room?: RoomFurniture;
};
const filter = createFilterOptions<RoomFurniture>();

export default function AutocompleteDialogRoom({ setRoom, room }: Props) {
  const { data } = useRoomFurnitureList({});
  const [value, setValue] = useState<RoomFurniture | null>(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState("");
  useEffect(() => {
    if (room) {
      setValue(room);
      setRoom(room._id);
    }
  }, [room]);

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
              setRoom(newValue?._id as string);
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
          options={data?.items ? data?.items : []}
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
              //     data && data.items && data.items.length
              //       ? ""
              //       : "Not room furniture,  Enter a room furniture to add new room furniture!"
              //   }
              //   error={data && data.items && data.items.length ? false : true}
              sx={{
                "& .MuiOutlinedInput-root": {
                  background: "#FFFFFF",
                },
              }}
              margin="dense"
            />
          )}
        />
        <RoomDialogCreate
          handleClose={handleClose}
          open={open}
          dialogValue={dialogValue}
          title="Did you miss any brand in our list? Please, add it!"
        />
      </Box>
    </>
  );
}
