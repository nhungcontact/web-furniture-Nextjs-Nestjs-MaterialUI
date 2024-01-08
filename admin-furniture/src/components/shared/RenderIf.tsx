"use client";

import React from "react";

export type RenderIfProps = {
  value?: unknown;
  inList?: unknown[];
  notInList?: unknown[];
  children: React.ReactNode;
};

function RenderIf({ value, inList, notInList, children }: RenderIfProps) {
  if (inList && inList.includes(value)) {
    return children;
  }

  if (notInList && !notInList.includes(value)) {
    return children;
  }

  if (!inList && !notInList && !!value) {
    return children;
  }

  return <></>;
}

export default RenderIf;
