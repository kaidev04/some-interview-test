'use client';

import { useEffect } from 'react';
import { ErrorDisplay } from '@/components/common';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorDisplay
      title="Något gick fel!"
      message={error.message || "Ett oväntat fel har inträffat."}
      action={{
        text: "Försök igen",
        onClick: reset
      }}
    />
  );
} 