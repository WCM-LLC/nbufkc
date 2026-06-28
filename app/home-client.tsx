"use client";

import { useTina } from "tinacms/dist/react";
import type { SiteSettingsQuery } from "@/tina/__generated__/types";

type Props = {
  data: SiteSettingsQuery;
  query: string;
  variables: { relativePath: string };
};

export default function HomeClient(props: Props) {
  const { data } = useTina(props);
  const settings = data.siteSettings;

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold" data-tina-field="orgName">
        {settings.orgName}
      </h1>
      <p className="mt-4 text-lg" data-tina-field="tagline">
        {settings.tagline}
      </p>
    </main>
  );
}
