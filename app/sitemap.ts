import type { MetadataRoute } from "next";
import client from "@/tina/__generated__/client";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/updates",
    "/partners",
    "/resources",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  // Add published update posts
  try {
    const res = await client.queries.updateConnection();
    for (const edge of res.data.updateConnection.edges ?? []) {
      const node = edge?.node;
      if (!node || node.draft) continue;
      entries.push({
        url: `${siteUrl}/updates/${node._sys.filename}`,
        lastModified: node.date ? new Date(node.date) : new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
      });
    }
  } catch {
    // If content can't be read at build time, fall back to static routes only.
  }

  return entries;
}
