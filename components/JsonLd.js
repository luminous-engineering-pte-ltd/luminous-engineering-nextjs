export default function JsonLd({ data = [] }) {
  return data.map((entry, index) => (
    <script
      key={index}
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(entry).replace(/</g, "\\u003c")
      }}
    />
  ));
}

