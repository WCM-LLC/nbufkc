import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Organizations the National Black United Front – Kansas City works alongside.",
  alternates: { canonical: "/partners" },
};

export default async function PartnersPage() {
  const res = await client.queries.partnerConnection();
  const partners = (res.data.partnerConnection.edges ?? [])
    .map((e) => e?.node)
    .filter((n): n is NonNullable<typeof n> => Boolean(n))
    .sort((a, b) => {
      const ao = a.order ?? 9999;
      const bo = b.order ?? 9999;
      if (ao !== bo) return ao - bo;
      return (a.name ?? "").localeCompare(b.name ?? "");
    });

  return (
    <div className={`${container} py-16`}>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-brand-black">
          Our Partners
        </h1>
        <p className="mt-3 text-lg text-neutral-700">
          We organize in community with others. These are organizations we work
          alongside.
        </p>
      </header>

      {partners.length === 0 ? (
        <p className="mt-10 rounded-xl border border-dashed border-neutral-300 bg-brand-cream p-8 text-center text-neutral-600">
          Partner organizations will be listed here soon.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <li
              key={partner._sys.filename}
              className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-brand-green-dark">
                {partner.name}
              </h2>
              {partner.blurb && (
                <p className="mt-2 flex-1 text-neutral-700">{partner.blurb}</p>
              )}
              {partner.url && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 font-semibold text-brand-red hover:underline"
                >
                  Visit website →
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
