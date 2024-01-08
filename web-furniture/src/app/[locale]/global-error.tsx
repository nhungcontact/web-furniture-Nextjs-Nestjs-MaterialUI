"use client";

import ErrorContent from "@/components/errors/ErrorContent";

type GlobalErrorProps = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html>
      <body>
        <ErrorContent
          title={`[Global] ${error.name}`}
          error={error}
          onTryAgain={reset}
        />
      </body>
    </html>
  );
}
