"use client";

import { Link, LinkProps } from "@mui/material";
import React from "react";
import NextLink from "next-intl/link";
import { Url } from "next/dist/shared/lib/router/router";

function CustomLink(
  props: Pick<LinkProps, "sx" | "children" | "color" | "variant"> & { href: Url },
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
