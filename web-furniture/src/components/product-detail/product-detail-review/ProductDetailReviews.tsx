/* eslint-disable max-lines */
import RatingReview from "@/components/shared/RatingReview";
import SelectWithoutLabel from "@/components/shared/SelectWithoutLabel";
import useReviewAverageRating from "@/hooks/reviews/useReviewAverageRating";
import useReviewList from "@/hooks/reviews/useReviewList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { GetReview, Review, ReviewStatus } from "@/types/review";
import { ListOptions } from "@/types/shared";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductDetailReviewFeatured from "./ProductDetailReviewFeatured";
import ProductDetailReviewsItem from "./ProductDetailReviewsItem";
import { GetProductSku } from "@/types/product-sku";
import { useTranslations } from "next-intl";
type Props = {
  item: GetProductSku[];
};
export const ProductDetailReviews = ({ item }: Props) => {
  const [productSku, setProductSku] = useState(item[0]._id);
  const t = useTranslations("ProductDetail");

  const [options, setOptions] = useQueryParams<ListOptions<Review>>({
    limit: 10,
    offset: 0,
    sortBy: "createdAt",
    sortOrder: "desc",
    status: ReviewStatus.Approved,
  });
  const { data: reviewTop } = useReviewList({ ...options, productSku: productSku });
  console.log("reviews", reviewTop);
  const [sortReview, setSortReview] = useState("latest");

  const handleChangeSortReview = (event: SelectChangeEvent<unknown>) => {
    setSortReview(event.target.value as string);
    if (event.target.value === "latest") {
      setOptions({
        ...options,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
    }
    if (event.target.value === "oldest") {
      setOptions({
        ...options,
        sortBy: "createdAt",
        sortOrder: "asc",
      });
    }
    if (event.target.value === "highestRated") {
      setOptions({
        ...options,
        sortBy: "rating",
        sortOrder: "desc",
      });
    }
    if (event.target.value === "lowestRated") {
      setOptions({
        ...options,
        sortBy: "rating",
        sortOrder: "asc",
      });
    }
  };
  const handleChangeProductSku = (event: SelectChangeEvent<unknown>) => {
    setProductSku(event.target.value as string);
    setOptions({
      ...options,
      productSku: event.target.value as string,
    });
  };

  const calculateAverageRating = (reviews: GetReview[]) => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <>
      <Box
        bgcolor={"rgba(0, 0, 0, .03)"}
        paddingY={"40px"}
      >
        <Container>
          <Box textAlign={"center"}>
            <Typography
              variant="h4"
              fontWeight={"600"}
            >
              {t("Reviews")}
            </Typography>
            <Typography
              variant="body1"
              textTransform={"capitalize"}
              marginY={1}
            >
              {t("Our Community Guidelines Help Customers Write Honest Reviews")}
            </Typography>
          </Box>
          {!!reviewTop && !!reviewTop.items && !!reviewTop.items.length && (
            <Box marginTop={2}>
              <ProductDetailReviewFeatured reviewTop={reviewTop?.items} />
            </Box>
          )}
          <Box
            display={"flex"}
            alignItems={"end"}
            justifyContent={"space-between"}
            marginBottom={4}
          >
            <Box
              marginTop={3}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"start"}
            >
              <Typography
                variant="h3"
                fontWeight={"600"}
                marginRight={1}
              >
                {reviewTop && reviewTop.items
                  ? calculateAverageRating(reviewTop.items)
                  : 0}
              </Typography>
              <RatingReview
                defaultValue={
                  reviewTop && reviewTop.items
                    ? reviewTop.items.reduce((sum, review) => sum + review.rating, 0) /
                      reviewTop.items.length
                    : 0
                }
              />

              <Typography
                variant="body1"
                textTransform={"capitalize"}
                marginLeft={1}
              >
                {reviewTop && reviewTop.total !== 0 ? reviewTop.total : 0} {t("Reviews")}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"end"}
              alignItems={"center"}
            >
              <SelectWithoutLabel
                displayEmpty
                value={productSku}
                onChange={handleChangeProductSku}
                sx={{
                  mr: 2,
                  "& .MuiOutlinedInput-input": {
                    color: "black",
                    padding: "10px 15px",
                  },
                }}
              >
                {!!item &&
                  !!item.length &&
                  item.map((val) => (
                    <MenuItem
                      key={val._id}
                      value={val._id}
                    >
                      {val.optionValues.map(
                        (i, index) =>
                          `${i.name}  ${
                            index !== val.optionValues.length - 1 ? ", " : ""
                          } `,
                      )}
                    </MenuItem>
                  ))}
              </SelectWithoutLabel>
              <SelectWithoutLabel
                displayEmpty
                value={sortReview}
                onChange={handleChangeSortReview}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    color: "black",
                    padding: "10px 15px",
                  },
                }}
              >
                {/* -1 by createdAt */}
                <MenuItem value={"latest"}>{t("Latest")}</MenuItem>
                {/* 1 by createdAt */}
                <MenuItem value={"oldest"}>{t("Oldest")}</MenuItem>
                {/* -1 by rating */}
                <MenuItem value={"highestRated"}>{t("Highest Rated")}</MenuItem>
                {/* 1 by rating */}
                <MenuItem value={"lowestRated"}>{t("Lowest Rated")}</MenuItem>
              </SelectWithoutLabel>
            </Box>
          </Box>
          <Divider />
          {!!reviewTop &&
            !!reviewTop.items &&
            !!reviewTop.items.length &&
            reviewTop.items.map((item) => (
              <ProductDetailReviewsItem
                key={item._id}
                item={item}
              />
            ))}
          {!reviewTop?.items?.length && <Typography>No review</Typography>}
        </Container>
      </Box>
    </>
  );
};
