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
      title="Something went wrong!"
      message="We encountered an error while loading the posts. Please try again."
      actionText="Try again"
      onAction={reset}
    />
  );
} 