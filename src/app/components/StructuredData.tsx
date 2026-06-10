export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Criminal Justice Reform",
    "url": "https://injusticereformnetwork.org/criminal-injustice/",
    "description": "IRN documents civil rights incidents, fights wrongful convictions, and builds accountability infrastructure for Hampton Roads communities. Report anonymously through CHRT.",
    "publisher": {
      "@type": "Organization",
      "name": "Injustice Reform Network",
      "url": "https://injusticereformnetwork.org",
      "logo": "https://injusticereformnetwork.org/wp-content/uploads/2025/01/logo.png",
      "sameAs": ["https://facebook.com/IRN", "https://twitter.com/IRN"],
      "nonprofit": true
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
