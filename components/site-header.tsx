"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { NAV_LINKS } from "@/lib/site";
import type { SiteSettingsQuery } from "@/tina/__generated__/types";

type Settings = SiteSettingsQuery["siteSettings"];

export default function SiteHeader({ settings }: { settings: Settings }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-brand-green bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-heading text-lg font-extrabold leading-tight text-brand-black"
        >
          {settings.logo ? (
            <Image
              src={settings.logo}
              alt={`${settings.orgName} logo`}
              width={48}
              height={48}
              className="h-12 w-auto"
              priority
            />
          ) : (
            <span aria-hidden className="text-2xl">
              {/* [LOGO] placeholder mark — Pan-African colors */}
              <span className="text-brand-red">●</span>
              <span className="text-brand-black">●</span>
              <span className="text-brand-green">●</span>
            </span>
          )}
          <span className="max-w-[12rem] sm:max-w-none">
            {settings.orgName}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-brand-green-light ${
                    isActive(link.href)
                      ? "text-brand-green-dark underline decoration-brand-gold decoration-2 underline-offset-8"
                      : "text-brand-black"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-black md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="border-t border-neutral-200 bg-white md:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-md px-3 py-3 text-base font-semibold ${
                    isActive(link.href)
                      ? "bg-brand-green-light text-brand-green-dark"
                      : "text-brand-black"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
