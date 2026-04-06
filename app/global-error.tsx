'use client';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <p>Please refresh the page or try again later.</p>
      </body>
    </html>
  );
}
