import type { Metadata } from "next";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import client from "@/tina/__generated__/client";
import ContactForm from "@/components/contact-form";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the National Black United Front – Kansas City. Visit us at 7714 Prospect Ave., Kansas City, MO.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = (
    await client.queries.siteSettings({ relativePath: "index.json" })
  ).data.siteSettings;

  const addressQuery = encodeURIComponent(
    [settings.address?.line1, settings.address?.line2]
      .filter(Boolean)
      .join(", ") || "7714 Prospect Ave, Kansas City, MO",
  );
  const mapSrc =
    settings.address?.mapEmbedUrl ||
    `https://www.google.com/maps?q=${addressQuery}&output=embed`;

  return (
    <div className={`${container} py-16`}>
      <header className="max-w-2xl">
        <h1 className="text-4xl font-extrabold text-brand-black">Contact Us</h1>
        <p className="mt-3 text-lg text-neutral-700">
          Questions, ideas, or want to get involved? Send us a message or visit
          us in person.
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        {/* Left: details + map */}
        <div>
          <h2 className="text-2xl font-bold text-brand-green-dark">Visit</h2>
          <address className="mt-3 space-y-1 not-italic text-neutral-800">
            {settings.address?.line1 && <div>{settings.address.line1}</div>}
            {settings.address?.line2 && <div>{settings.address.line2}</div>}
          </address>

          <dl className="mt-6 space-y-3 text-neutral-800">
            {settings.phone && (
              <div>
                <dt className="text-sm font-semibold uppercase text-neutral-500">
                  Phone
                </dt>
                <dd>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-brand-green-dark hover:underline"
                  >
                    {settings.phone}
                  </a>
                </dd>
              </div>
            )}
            {settings.email && (
              <div>
                <dt className="text-sm font-semibold uppercase text-neutral-500">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-brand-green-dark hover:underline"
                  >
                    {settings.email}
                  </a>
                </dd>
              </div>
            )}
            {settings.hours && (
              <div>
                <dt className="text-sm font-semibold uppercase text-neutral-500">
                  Hours
                </dt>
                <dd>{settings.hours}</dd>
              </div>
            )}
          </dl>

          <div className="mt-6 flex items-center gap-4">
            {settings.social?.facebook && (
              <a
                href={settings.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NBUF-KC on Facebook"
                className="text-brand-green-dark hover:text-brand-green"
              >
                <FaFacebook size={26} />
              </a>
            )}
            {settings.social?.instagram && (
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NBUF-KC on Instagram"
                className="text-brand-green-dark hover:text-brand-green"
              >
                <FaInstagram size={26} />
              </a>
            )}
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200">
            <iframe
              title="Map to NBUF-KC office"
              src={mapSrc}
              width="100%"
              height="320"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* Right: form */}
        <div>
          <h2 className="text-2xl font-bold text-brand-green-dark">
            Send a Message
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
