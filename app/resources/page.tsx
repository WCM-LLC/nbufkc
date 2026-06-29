import type { Metadata } from "next";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import client from "@/tina/__generated__/client";
import { container, btnPrimary } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Documents, flyers, and materials from the National Black United Front – Kansas City.",
  alternates: { canonical: "/resources" },
};

export default async function ResourcesPage() {
  const res = await client.queries.resourceConnection();
  const settings = await client.queries.siteSettings({
    relativePath: "index.json",
  });
  const social = settings.data.siteSettings.social;

  const resources = (res.data.resourceConnection.edges ?? [])
    .map((e) => e?.node)
    .filter((n): n is NonNullable<typeof n> => Boolean(n))
    .sort((a, b) => {
      const ao = a.order ?? 9999;
      const bo = b.order ?? 9999;
      if (ao !== bo) return ao - bo;
      return (a.title ?? "").localeCompare(b.title ?? "");
    });

  return (
    <div className={`${container} py-16`}>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-brand-black">Resources</h1>
        <p className="mt-3 text-lg text-neutral-700">
          Documents and materials from NBUF-KC. Follow us on social media for
          the latest.
        </p>
      </header>

      {/* Downloads */}
      <section className="mt-10">
        <h2 className="sr-only">Downloads</h2>
        {resources.length === 0 ? (
          <p className="rounded-xl border border-dashed border-neutral-300 bg-brand-cream p-8 text-center text-neutral-600">
            Downloadable resources will appear here soon.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {resources.map((r) => (
              <li
                key={r._sys.filename}
                className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <HiDocumentText
                  className="mt-1 shrink-0 text-brand-green"
                  size={28}
                  aria-hidden
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-brand-black">
                    {r.title}
                  </h3>
                  {r.type && (
                    <span className="mt-1 inline-block rounded bg-brand-green-light px-2 py-0.5 text-xs font-semibold uppercase text-brand-green-dark">
                      {r.type}
                    </span>
                  )}
                  {r.description && (
                    <p className="mt-2 text-neutral-700">{r.description}</p>
                  )}
                  {r.file && (
                    <a
                      href={r.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block font-semibold text-brand-red hover:underline"
                    >
                      Download / View →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Social */}
      <section className="mt-14 rounded-2xl bg-brand-green-light p-8">
        <h2 className="text-2xl font-bold text-brand-black">Follow NBUF-KC</h2>
        <p className="mt-2 text-neutral-700">
          See photos and updates from our events and organizing.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          {social?.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
            >
              <FaInstagram className="mr-2" aria-hidden /> Instagram
            </a>
          )}
          {social?.facebook && (
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-brand-green bg-white px-6 py-3 font-semibold text-brand-green-dark hover:bg-white/70"
            >
              <FaFacebook className="mr-2" aria-hidden /> Facebook
            </a>
          )}
        </div>
        {/*
          Note: a live Instagram *feed* embed requires a third-party widget or the
          Instagram API. We link to the profile above. To embed a specific post,
          paste its embed iframe here. See PLACEHOLDERS in the README.
        */}
      </section>
    </div>
  );
}
