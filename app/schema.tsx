import Script from "next/script";

export default function SchemaMarkup() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CrumbLab Agency",
    description:
      "We provide expert branding, logo design, SEO, video editing, and more digital services.",
    url: "https://crum-blab.vercel.app/",
    logo: "https://crum-blab.vercel.app/assets/logo_small.png",
    sameAs: ["https://facebook.com/crumbLab", "https://twitter.com/crumbLab"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "City",
      addressCountry: "Country",
    },
  };

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
