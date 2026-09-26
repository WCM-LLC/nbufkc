import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import AboutContent from "@/components/about-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the National Black United Front – Kansas City: our mission, vision, history, and the work we do for Black self-determination and liberation.",
  alternates: { canonical: "about" },
};

export default async function AboutPage() {
  const about = await client.queries.about({ relativePath: "index.json" });
  return (
    <AboutContent
      data={about.data}
      query={about.query}
      variables={about.variables}
    />
  );
}
