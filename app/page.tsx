import client from "@/tina/__generated__/client";
import HomeContent from "@/components/home-content";

export default async function HomePage() {
  const home = await client.queries.home({ relativePath: "index.json" });
  const settings = await client.queries.siteSettings({
    relativePath: "index.json",
  });
  const updatesRes = await client.queries.updateConnection({
    sort: "date",
    last: 3,
  });

  const updates = (updatesRes.data.updateConnection.edges ?? [])
    .map((e) => e?.node)
    .filter((n): n is NonNullable<typeof n> => Boolean(n))
    .filter((n) => !n.draft)
    .reverse(); // newest first

  return (
    <HomeContent
      data={home.data}
      query={home.query}
      variables={home.variables}
      settings={settings.data.siteSettings}
      updates={updates.map((u) => ({
        slug: u._sys.filename,
        title: u.title,
        date: u.date,
        excerpt: u.excerpt ?? null,
      }))}
    />
  );
}
