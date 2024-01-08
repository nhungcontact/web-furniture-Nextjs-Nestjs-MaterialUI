import { Option, OptionNull } from "@/types/option";
import { OptionValue } from "@/types/option-value";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import AutocompleteDialogOption from "../../autocomplete/AutocompleteDialogOption";
import AutocompleteMultipleDialogOptionValue from "../../autocomplete/AutocompleteMultipleDialogOptionValue";
type Props = {
  index: number;
  handleInputChange: (value: Option | OptionValue[], name: string, index: number) => void;
  handleRemoveOption: (index: number) => void;
  data: OptionNull;
};
export default function OptionCreate({
  index,
  handleInputChange,
  handleRemoveOption,
  data,
}: Props) {
  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        columnSpacing={2}
        mb={3}
      >
        <Grid
          item
          xs={4}
        >
          <Typography
            variant="body1"
            fontWeight={"600"}
            marginBottom={1}
            color="black"
          >
            Option
          </Typography>
          <AutocompleteDialogOption
            handleInputChange={handleInputChange}
            index={index}
            val={data.optionSku}
          />
        </Grid>
        <Grid
          item
          xs={7}
        >
          <Typography
            variant="body1"
            fontWeight={"600"}
            marginBottom={1}
            color="black"
          >
            Value
          </Typography>
          <AutocompleteMultipleDialogOptionValue
            optionID={data.optionSku && (data.optionSku._id as string)}
            handleInputChange={handleInputChange}
            index={index}
            val={data.optionValues}
          />
        </Grid>
        <Grid
          item
          xs={1}
        >
          <br />
          <IconButton
            color="error"
            onClick={() => handleRemoveOption(index)}
            size="small"
            // className="btn-action"
          >
            <DeleteOutlineOutlined />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
