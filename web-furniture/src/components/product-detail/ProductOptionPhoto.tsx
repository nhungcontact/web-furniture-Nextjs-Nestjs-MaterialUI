import { MergeValues } from "@/utils/merge-option-value";
import { Box, Tooltip, Typography, Zoom } from "@mui/material";
import Image from "next/image";
import React from "react";
import RadioColor from "../shared/RadioColor";

type Props = {
  item: MergeValues;
  getValue: (val: string, index: number) => void;
  index: number;
};
export default function ProductOptionPhoto({ item, index, getValue }: Props) {
  const [material, setMaterial] = React.useState("");
  const [materialName, setMaterialName] = React.useState("");

  const handleChangeMaterial = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaterial((event.target as HTMLInputElement).value);
    setMaterialName((event.target as HTMLInputElement).ariaLabel as string);
    getValue((event.target as HTMLInputElement).value, index);
  };
  const controlMaterialProps = (id: string, name: string) => ({
    checked: material === id,
    onChange: handleChangeMaterial,
    value: id,
    inputProps: { "aria-label": name },
  });
  return (
    <Box marginTop={2}>
      <Typography
        variant="caption"
        fontWeight={600}
        display={"inline"}
        marginRight={1}
      >
        Select
        {item.optionSku && item.optionSku.name}:{" "}
      </Typography>
      <Typography
        variant="body1"
        display={"inline"}
      >
        {materialName}
      </Typography>
      <Box marginTop={1}>
        {item &&
          item.optionValues &&
          item.optionValues.map((val) => (
            <Tooltip
              key={val._id}
              placement="top"
              title={
                <React.Fragment>
                  <Box padding={1}>
                    <Typography>{val.name}</Typography>
                    <Image
                      unoptimized
                      src={val.photo ? val.photo.imageURL : "/"}
                      width={250}
                      height={170}
                      alt={val.photo ? val.photo.name : "photo"}
                    />
                  </Box>
                </React.Fragment>
              }
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 400 }}
              arrow
            >
              <Box display={"inline"}>
                <RadioColor
                  {...controlMaterialProps(val._id as string, val.name as string)}
                  icon={
                    <Image
                      unoptimized
                      src={val.photo ? val.photo.imageURL : "/"}
                      width={50}
                      height={50}
                      alt={val.photo ? val.photo.name : "photo"}
                    />
                  }
                  checkedIcon={
                    <Box sx={{ border: `1px solid black`, padding: "5px 5px 0px 5px" }}>
                      <Image
                        unoptimized
                        src={val.photo ? val.photo.imageURL : "/"}
                        width={50}
                        height={50}
                        alt={val.photo ? val.photo.name : "photo"}
                      />
                    </Box>
                  }
                  sx={{ padding: "0px 5px 0px 5px" }}
                />
              </Box>
            </Tooltip>
          ))}
      </Box>
    </Box>
  );
}
