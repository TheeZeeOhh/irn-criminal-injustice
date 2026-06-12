export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NonprofitOrganization",
        "name": "Injustice Reform Network",
        "url": "https://injusticereformnetwork.org",
        "logo": "https://injusticereformnetwork.org/og/criminal-injustice.jpg",
        "sameAs": ["https://facebook.com/IRN", "https://twitter.com/IRN"],
        "description": "IRN documents civil rights incidents, fights wrongful convictions, and builds accountability infrastructure for Hampton Roads communities."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are my rights during a police encounter in Virginia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In Virginia, you have the right to remain silent and are not required to answer questions beyond identifying yourself in specific circumstances. You may refuse consent to a search. If you are detained, you have the right to ask whether you are free to go."
            }
          },
          {
            "@type": "Question",
            "name": "What is a Manifestation Determination Review and when do I need one?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Manifestation Determination Review (MDR) is a required meeting that must happen within 10 school days whenever a school proposes to remove a student with a disability for more than 10 consecutive days."
            }
          },
          {
            "@type": "Question",
            "name": "Can IRN represent me in court?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "IRN is not a law firm and does not provide legal representation. IRN documents your case, connects you with civil rights attorneys, provides trauma-informed accompaniment, and issues solidarity statements."
            }
          },
          {
            "@type": "Question",
            "name": "What happens to my data when I report through CHRT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CHRT is built on a zero-knowledge architecture. Client-side AES-256-GCM encryption means your report is encrypted before it ever leaves your device."
            }
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
