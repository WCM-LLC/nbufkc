import client from "@/tina/__generated__/client";
import HomeClient from "./home-client";

export default async function Home() {
  const settings = await client.queries.siteSettings({
    relativePath: "index.json",
  });

  return (
    <HomeClient
      data={settings.data}
      query={settings.query}
      variables={settings.variables}
    />
  );
}
