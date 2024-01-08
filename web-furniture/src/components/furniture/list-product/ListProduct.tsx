"use client";
import { MenuDropdownClick } from "@/components/shared/MenuDropdownClick";
import ProductCardHover from "@/components/shared/ProductCardHover";
import useOptionList from "@/hooks/options/useOptionList";
import useProductList from "@/hooks/products/useProductList";
// import { sort } from "@/mocks/page.mock";
import { OptionValue } from "@/types/option-value";
import { GetProduct, Product } from "@/types/product";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckboxesAutocomplete from "./CheckboxesAutocomplete";
import { FilterProduct } from "./FilterProduct";
import { ListCatByRoom } from "./ListCatByRoom";
import { ListOptions } from "@/types/shared";

export default function ListProduct() {
  const searchParams = useSearchParams();
  const [listProduct, setListProduct] = useState<GetProduct[]>();
  const room = searchParams.get("roomFurniture");
  const cat = searchParams.get("category");
  const [options, setOpions] = useState<ListOptions<Product>>({
    // limit: 16,
    // offset: 0,
    isHidden: false,
    ...(room ? { roomFurniture: room } : {}),
    ...(cat ? { category: cat } : {}),
  });
  const { data } = useProductList(options);
  const { data: dataOption } = useOptionList({});
  const handleInputChange = (option: string, value: OptionValue[]) => {
    const val = value.map((item) => item._id);
    if (data && data.items) {
      const filteredProducts = data.items.filter((product) => {
        // Check if any productSku has matching optionValues
        return product.productSkus.some((productSku) => {
          return productSku.optionValues.some((optionValue) => {
            return val.includes(optionValue._id);
          });
        });
      });

      if (filteredProducts.length) {
        setListProduct(filteredProducts);
      } else {
        setListProduct(data.items);
      }
    }
  };
  useEffect(() => {
    if (data && data.items && data.items.length) {
      setListProduct(data.items);
    }
  }, [data]);

  const handleMenuItemClick = (value: string) => {
    if (value === "name-asc") {
      setOpions({
        ...options,
        sortBy: "name",
        sortOrder: "asc",
      });
    } else if (value === "name-desc") {
      setOpions({
        ...options,
        sortBy: "name",
        sortOrder: "desc",
      });
    }
  };

  return (
    <>
      <Divider />
      <Container
        maxWidth={"xl"}
        sx={{ paddingY: 4 }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box
            bgcolor={"#f4f4f4"}
            p={"5px"}
          >
            <Typography variant="caption">{data?.total} items</Typography>
          </Box>
        </Box>
        <Box
          textAlign={"center"}
          pb={2}
        >
          <Typography
            variant="h3"
            textTransform={"uppercase"}
            fontWeight={"bold"}
          >
            Shop by {room ? "Room" : "Category"}
          </Typography>
        </Box>
        <ListCatByRoom />
        {/* <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
          <SortProduct />
          <ViewProduct />
        </Box> */}

        {listProduct && listProduct.length > 0 && (
          <Box pt={4}>
            <Typography
              mb={2}
              variant="h4"
              textTransform={"capitalize"}
              fontWeight={"bold"}
            >
              {room ? listProduct[0].roomFurniture.name : listProduct[0].category.name}
            </Typography>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid
                item
                md={8}
              >
                <Grid
                  container
                  columnSpacing={2}
                >
                  {/* <MenuDropdown
                  title="Menu"
                  data={dataOption}
                /> */}
                  {dataOption?.items &&
                    dataOption.items.length > 0 &&
                    dataOption.items.map((item) => (
                      <Grid
                        key={item._id}
                        item
                        xs={2}
                      >
                        <CheckboxesAutocomplete
                          item={item}
                          handleInputChange={handleInputChange}
                        />
                      </Grid>
                    ))}

                  {/* <Grid
                    item
                    xs={2}
                  >
                    <FilterProduct />
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid
                item
                md={4}
                textAlign={"end"}
              >
                <MenuDropdownClick
                  title="Sort"
                  //   data={sort}
                  handleMenuItemClick={handleMenuItemClick}
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={4}
              marginTop={4}
              justifyContent="left"
            >
              {!!listProduct &&
                !!listProduct.length &&
                listProduct.map((product) => (
                  <Grid
                    key={product._id}
                    item
                    xs={4}
                    md={3}
                  >
                    <ProductCardHover item={product} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
}
