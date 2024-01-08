"use client";
import useOptionList from "@/hooks/options/useOptionList";
import useProductList from "@/hooks/products/useProductList";
import { OptionValue } from "@/types/option-value";
import { GetProduct, Product } from "@/types/product";
import { ListOptions } from "@/types/shared";
import { Container, Grid, LinearProgress, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckboxesAutocomplete from "../furniture/list-product/CheckboxesAutocomplete";
import { FilterProduct } from "../furniture/list-product/FilterProduct";
import { MenuDropdownClick } from "../shared/MenuDropdownClick";
import ProductCardHover from "../shared/ProductCardHover";

export default function Search() {
  const t = useTranslations("MainPage");
  const searchParams = useSearchParams();
  const [listProduct, setListProduct] = useState<GetProduct[]>();

  const search = searchParams.get("search");
  const [options, setOpions] = useState<ListOptions<Product>>({
    limit: 20,
    offset: 0,
    search: search as string,
  });
  const { data, isLoading, error } = useProductList(options);

  const { data: dataOption } = useOptionList({});
  const handleInputChange = (name: string, value: OptionValue[]) => {
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
      {!!isLoading && !error && <LinearProgress />}
      <Container
        sx={{ py: 4 }}
        maxWidth="xl"
      >
        <Typography
          variant="h6"
          mb={3}
        >
          {data?.total} {t("search results for")} <b>&quot;{search}&quot;</b>
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

              <Grid
                item
                xs={2}
              >
                <FilterProduct />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={4}
            textAlign={"end"}
          >
            <MenuDropdownClick
              title={t("Sort")}
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
            listProduct.map((item) => (
              <Grid
                key={item._id}
                item
                xs={4}
                md={3}
              >
                <ProductCardHover item={item} />
              </Grid>
            ))}
        </Grid>
        {data?.total === 0 && <Typography>No product</Typography>}
      </Container>
    </>
  );
}
