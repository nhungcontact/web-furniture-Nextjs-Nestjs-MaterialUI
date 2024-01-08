import useProductList from "@/hooks/products/useProductList";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "../shared/ProductCard";
import { sortQuantitySold } from "@/utils/sort-quantity-sold";

export default function BestSeller() {
  const { data } = useProductList({});
  return (
    <>
      <Box
        textAlign={"center"}
        marginBottom={4}
      >
        <Typography
          variant="body1"
          color={"black"}
          textTransform={"uppercase"}
        >
          Our product
        </Typography>
        <Typography
          variant="h3"
          color={"black"}
          textTransform={"uppercase"}
        >
          Best Sellers
        </Typography>
      </Box>
      <Grid
        container
        spacing={4}
      >
        {!!data &&
          !!data.items &&
          !!data.items.length &&
          sortQuantitySold(data.items)
            .slice(0, 8)
            .map((item) => (
              <Grid
                item
                xs={6}
                md={3}
                key={item._id}
              >
                <ProductCard
                  item={item}
                  //   seller={Math.max(item.productSkus.map((val) => val.quantitySold))}
                />
              </Grid>
            ))}
      </Grid>
    </>
  );
}
