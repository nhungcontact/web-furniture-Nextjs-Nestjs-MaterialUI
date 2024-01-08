"use client";

import { Link, LinkProps } from "@mui/material";
import React from "react";
import NextLink from "next-intl/link";

function CustomLink(
  props: Pick<LinkProps, "sx" | "href" | "children" | "color" | "variant">,
  ref: React.Ref<HTMLAnchorElement>,
) {
  return (
    <Link
      ref={ref}
      component={NextLink}
      {...props}
    />
  );
}

export default React.forwardRef(CustomLink);
