"use client";

import ErrorContent from "@/components/errors/ErrorContent";

type RootErrorProps = {
  error: Error;
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <ErrorContent
      error={error}
      onTryAgain={reset}
    />
  );
}
