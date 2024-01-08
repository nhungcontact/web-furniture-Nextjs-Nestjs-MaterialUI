import { Address } from "@/types/address";
import { CloseRounded } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import AutocompleteCommune from "../information-autocomplete/AutocompleteCommune";
import AutocompleteDistrict from "../information-autocomplete/AutocompleteDistrict";
import AutocompleteProvince from "../information-autocomplete/AutocompleteProvince";
type Props = {
  item: Address;
  index: number;
  handleInputChange: (value: string, name: string, index: number) => void;
  handleRemoveAddress: (val: number) => void;
  isUpdate: boolean;
};
export default function InforAddress({
  item,
  index,
  handleInputChange,
  handleRemoveAddress,
  isUpdate,
}: Props) {
  const [province, setProvince] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const handleGetProvince = (v: string) => {
    setProvince(v);
  };
  const handleGetDistrict = (v: string) => {
    setDistrict(v);
  };

  return (
    <>
      <Grid
        item
        xs={12}
        textAlign={"end"}
        my={2}
      >
        <Button
          variant="outlined"
          onClick={() => handleRemoveAddress(index)}
        >
          Remove
        </Button>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        mb={2}
      >
        <Typography
          variant="body2"
          fontWeight={"600"}
          marginBottom={1}
        >
          Province
        </Typography>
        <AutocompleteProvince
          getValue={handleGetProvince}
          handleInputChange={handleInputChange}
          index={index}
          data={item.province}
          isUpdate={isUpdate}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        mb={2}
      >
        <Typography
          variant="body2"
          fontWeight={"600"}
          marginBottom={1}
        >
          District
        </Typography>
        <AutocompleteDistrict
          provinceId={province}
          getValue={handleGetDistrict}
          handleInputChange={handleInputChange}
          index={index}
          data={item.district}
          isUpdate={isUpdate}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        mb={2}
      >
        <Typography
          variant="body2"
          fontWeight={"600"}
          marginBottom={1}
        >
          Commune
        </Typography>
        <AutocompleteCommune
          districtId={district}
          handleInputChange={handleInputChange}
          index={index}
          data={item.commune}
          isUpdate={isUpdate}
        />
      </Grid>
      <Grid
        item
        xs={12}
        mb={2}
      >
        <Typography
          variant="body2"
          fontWeight={"600"}
          marginBottom={1}
        >
          Address Detail
        </Typography>
        <TextField
          InputProps={{
            readOnly: !isUpdate,
          }}
          fullWidth
          multiline
          rows={3}
          onChange={(e) => handleInputChange(e.target.value, "addressDetail", index)}
          defaultValue={item.addressDetail}
          placeholder="Enter number home, street,..."
          size="small"
        />
      </Grid>
    </>
  );
}
