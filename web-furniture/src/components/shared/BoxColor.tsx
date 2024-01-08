import { MergeValues } from "@/utils/merge-option-value";
import { Grid, Tooltip } from "@mui/material";
import Image from "next/image";

type Props = {
  item: MergeValues;
};

export default function BoxColor({ item }: Props) {
  return (
    <Grid
      container
      spacing={2}
      alignItems={"center"}
      justifyContent={"start"}
    >
      {item &&
        item.optionSku.name === "Color" &&
        item.optionValues.map((val) => (
          <Grid
            item
            xs={4}
            md={3}
            key={val._id}
          >
            <Tooltip
              title={val.name}
              placement="top-start"
            >
              <Image
                src={val.photo.imageURL ?? "/"}
                alt={val.name ?? "-"}
                width={60}
                height={30}
                unoptimized
                style={{
                  borderRadius: 5,
                  width: "-webkit-fill-available",
                }}
              />
            </Tooltip>
          </Grid>
        ))}
    </Grid>
  );
}
