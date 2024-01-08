import { GetProductCat } from "@/types/product";
import { Box, Grid, Tab, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import { SyntheticEvent, useState } from "react";
import ProductCard from "./ProductCard";
type Props = {
  data: GetProductCat[];
};

interface TabPanelProps {
  val: string[];
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { val, value, index, ...other } = props;

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        {val.map((product) => (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            key={product}
          >
            <div
              role="tabpanel"
              hidden={value !== index}
              id={`vertical-tabpanel-${index}`}
              aria-labelledby={`vertical-tab-${index}`}
              {...other}
            >
              {value === index && <ProductCard product={product} />}
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default function SaleByCategory({ data }: Props) {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
      >
        {data.map((item, index) => (
          <Tab
            key={index}
            label={
              <Typography
                variant="h5"
                fontWeight="bold"
                paddingX={4}
              >
                {item.category.name}
              </Typography>
            }
          />
        ))}
      </Tabs>
      <Box mt={6}>
        {data.map((val, i) => (
          <TabPanel
            key={i}
            value={value}
            index={i}
            val={val.products.map((id) => id._id)}
          />
        ))}
      </Box>
    </>
  );
}
