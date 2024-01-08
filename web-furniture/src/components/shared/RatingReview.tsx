import * as React from "react";
import { RatingProps } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function RatingReview(props: RatingProps) {
  return (
    <Rating name="read-only" defaultValue={props.defaultValue} precision={0.5} size={props.size} readOnly/>
  );
}
