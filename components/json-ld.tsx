import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "I Putu Dana Putra",
  alternateName: "Dana",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/assets/avatar/Center.png`,
  jobTitle: "Design Systems Architect",
  description: SITE_DESCRIPTION,
  worksFor: { "@type": "Organization", name: "Farmacare" },
  knowsAbout: [
    "Design systems",
    "Design engineering",
    "DesignOps",
    "Experience design",
    "AI-assisted design",
  ],
  sameAs: ["https://www.linkedin.com/in/iputudanaputra/", "https://github.com/IPutuDanaPutra"],
};

// application/ld+json is a data block, so the strict CSP does not apply to it.
export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}
