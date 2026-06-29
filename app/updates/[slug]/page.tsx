import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@/tina/__generated__/client";
import UpdateContent from "@/components/update-content";

export async function generateStaticParams() {
  const res = await client.queries.updateConnection();
  return (res.data.updateConnection.edges ?? [])
    .map((e) => e?.node?._sys.filename)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

async function getPost(slug: string) {
  try {
    return await client.queries.update({ relativePath: `${slug}.mdx` });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Update not found" };
  return {
    title: post.data.update.title,
    description: post.data.update.excerpt ?? undefined,
    alternates: { canonical: `/updates/${slug}` },
    openGraph: {
      title: post.data.update.title,
      description: post.data.update.excerpt ?? undefined,
      type: "article",
      images: post.data.update.coverImage
        ? [{ url: post.data.update.coverImage }]
        : undefined,
    },
  };
}

export default async function UpdateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post.data.update.draft) notFound();

  return (
    <UpdateContent
      data={post.data}
      query={post.query}
      variables={post.variables}
    />
  );
}
