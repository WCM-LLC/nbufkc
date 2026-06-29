import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { NAV_LINKS } from "@/lib/site";
import type { SiteSettingsQuery } from "@/tina/__generated__/types";

type Settings = SiteSettingsQuery["siteSettings"];

export default function SiteFooter({ settings }: { settings: Settings }) {
  const year = 2026; // build-time constant; update yearly or wire to a date util
  return (
    <footer className="mt-16 bg-brand-black text-neutral-200">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h2 className="font-heading text-lg font-bold text-white">
            {settings.orgName}
          </h2>
          {settings.tagline && (
            <p className="mt-2 text-sm text-neutral-400">{settings.tagline}</p>
          )}
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-gold-light">
            Visit / Contact
          </h3>
          <address className="mt-3 space-y-1 text-sm not-italic text-neutral-300">
            {settings.address?.line1 && <div>{settings.address.line1}</div>}
            {settings.address?.line2 && <div>{settings.address.line2}</div>}
            {settings.phone && (
              <div>
                <a className="hover:text-white" href={`tel:${settings.phone}`}>
                  {settings.phone}
                </a>
              </div>
            )}
            {settings.email && (
              <div>
                <a
                  className="hover:text-white"
                  href={`mailto:${settings.email}`}
                >
                  {settings.email}
                </a>
              </div>
            )}
            {settings.hours && (
              <div className="text-neutral-400">{settings.hours}</div>
            )}
          </address>

          <div className="mt-4 flex items-center gap-4">
            {settings.social?.facebook && (
              <a
                href={settings.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NBUF-KC on Facebook"
                className="text-neutral-300 hover:text-white"
              >
                <FaFacebook size={22} />
              </a>
            )}
            {settings.social?.instagram && (
              <a
                href={settings.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="NBUF-KC on Instagram"
                className="text-neutral-300 hover:text-white"
              >
                <FaInstagram size={22} />
              </a>
            )}
          </div>

          {settings.donationLink && (
            <a
              href={settings.donationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-brand-gold px-5 py-2 text-sm font-bold text-brand-black hover:bg-brand-gold-light"
            >
              Donate
            </a>
          )}
        </div>

        <div>
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-gold-light">
            Explore
          </h3>
          <ul className="mt-3 space-y-1 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  className="text-neutral-300 hover:text-white"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-800 py-4">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-neutral-500 sm:px-6">
          © {year} {settings.orgName}. A chapter of the National Black United
          Front.
        </p>
      </div>
    </footer>
  );
}
