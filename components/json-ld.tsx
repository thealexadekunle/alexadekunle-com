/** Renders a JSON-LD graph into the document head stream. */
export function JsonLd({ graph }: { readonly graph: readonly unknown[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
