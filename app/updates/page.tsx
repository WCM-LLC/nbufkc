import type { Metadata } from "next";
import Link from "next/link";
import client from "@/tina/__generated__/client";
import { formatDate } from "@/lib/format";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Updates",
  description:
    "News, announcements, and updates from the National Black United Front – Kansas City.",
  alternates: { canonical: "/updates" },
};

export default async function UpdatesPage() {
  const res = await client.queries.updateConnection({ sort: "date" });
  const posts = (res.data.updateConnection.edges ?? [])
    .map((e) => e?.node)
    .filter((n): n is NonNullable<typeof n> => Boolean(n))
    .filter((n) => !n.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

  return (
    <div className={`${container} py-16`}>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-brand-black">Updates</h1>
        <p className="mt-3 text-lg text-neutral-700">
          News, announcements, and reflections from NBUF-KC.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-neutral-300 bg-brand-cream p-8 text-center text-neutral-600">
          No updates have been published yet. Check back soon.
        </p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((post) => (
            <li
              key={post._sys.filename}
              className="border-b border-neutral-200 pb-8"
            >
              <time className="text-sm text-neutral-500" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
              <h2 className="mt-1 text-2xl font-bold text-brand-black">
                <Link
                  href={`/updates/${post._sys.filename}`}
                  className="hover:text-brand-green-dark hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="mt-2 max-w-2xl text-neutral-700">
                  {post.excerpt}
                </p>
              )}
              <Link
                href={`/updates/${post._sys.filename}`}
                className="mt-3 inline-block font-semibold text-brand-green-dark hover:underline"
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
