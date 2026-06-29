"use client";

import Link from "next/link";
import { useTina, tinaField } from "tinacms/dist/react";
import type { HomeQuery, SiteSettingsQuery } from "@/tina/__generated__/types";
import RichText from "@/components/rich-text";
import { formatDate } from "@/lib/format";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";

type UpdateLink = {
  slug: string;
  title: string;
  date: string;
  excerpt: string | null;
};

type Props = {
  data: HomeQuery;
  query: string;
  variables: { relativePath: string };
  settings: SiteSettingsQuery["siteSettings"];
  updates: UpdateLink[];
};

export default function HomeContent(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const home = data.home;
  const settings = props.settings;

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-green-light">
        <div className={`${container} py-16 sm:py-24`}>
          <h1
            className="max-w-3xl text-4xl font-extrabold text-brand-black sm:text-5xl"
            data-tina-field={tinaField(home.hero, "heading")}
          >
            {home.hero?.heading}
          </h1>
          {home.hero?.subheading && (
            <p
              className="mt-5 max-w-2xl text-lg text-neutral-700"
              data-tina-field={tinaField(home.hero, "subheading")}
            >
              {home.hero.subheading}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            {home.hero?.primaryCtaLabel && (
              <Link
                href={home.hero.primaryCtaHref || "/contact"}
                className={btnPrimary}
              >
                {home.hero.primaryCtaLabel}
              </Link>
            )}
            {home.hero?.secondaryCtaLabel && (
              <Link
                href={home.hero.secondaryCtaHref || "/about"}
                className={btnSecondary}
              >
                {home.hero.secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* MISSION SNAPSHOT */}
      {home.mission && (
        <section className={`${container} py-16`}>
          <h2
            className="text-3xl font-bold text-brand-black"
            data-tina-field={tinaField(home.mission, "heading")}
          >
            {home.mission.heading}
          </h2>
          <div
            className="mt-4 max-w-3xl text-lg text-neutral-800"
            data-tina-field={tinaField(home.mission, "body")}
          >
            <RichText content={home.mission.body} />
          </div>
        </section>
      )}

      {/* ACTION CARDS */}
      {home.actionCards && home.actionCards.length > 0 && (
        <section className="bg-brand-cream">
          <div className={`${container} grid gap-6 py-16 md:grid-cols-3`}>
            {home.actionCards.map((card, i) =>
              card ? (
                <div
                  key={i}
                  className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
                  data-tina-field={tinaField(card, "title")}
                >
                  <h3 className="text-xl font-bold text-brand-green-dark">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-neutral-700">
                    {card.description}
                  </p>
                  {card.href && card.ctaLabel && (
                    <Link
                      href={card.href}
                      className="mt-4 font-semibold text-brand-red hover:underline"
                    >
                      {card.ctaLabel} →
                    </Link>
                  )}
                </div>
              ) : null,
            )}
          </div>
        </section>
      )}

      {/* OUR WORK */}
      {home.ourWork && (
        <section className={`${container} py-16`}>
          <h2
            className="text-3xl font-bold text-brand-black"
            data-tina-field={tinaField(home.ourWork, "heading")}
          >
            {home.ourWork.heading}
          </h2>
          {home.ourWork.intro && (
            <p className="mt-3 max-w-3xl text-lg text-neutral-700">
              {home.ourWork.intro}
            </p>
          )}
          {home.ourWork.focusAreas && home.ourWork.focusAreas.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {home.ourWork.focusAreas.map((area, i) =>
                area ? (
                  <div
                    key={i}
                    className="rounded-xl border-l-4 border-brand-gold bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-brand-black">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-neutral-700">{area.description}</p>
                  </div>
                ) : null,
              )}
            </div>
          )}
        </section>
      )}

      {/* UPCOMING FORUM */}
      {home.upcomingForum && (
        <section className="bg-brand-black text-white">
          <div className={`${container} py-16`}>
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h2
                  className="text-3xl font-bold text-brand-gold-light"
                  data-tina-field={tinaField(home.upcomingForum, "heading")}
                >
                  {home.upcomingForum.heading}
                </h2>
                {home.upcomingForum.body && (
                  <p className="mt-3 text-lg text-neutral-200">
                    {home.upcomingForum.body}
                  </p>
                )}
              </div>
              <div className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10">
                <dl className="space-y-3 text-neutral-100">
                  <div>
                    <dt className="text-sm uppercase tracking-wide text-brand-gold-light">
                      Date
                    </dt>
                    <dd className="text-lg">{settings.nextForumDate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm uppercase tracking-wide text-brand-gold-light">
                      Location
                    </dt>
                    <dd className="text-lg">
                      {settings.address?.line1}
                      {settings.address?.line2
                        ? `, ${settings.address.line2}`
                        : ""}
                    </dd>
                  </div>
                </dl>
                <Link href="/contact" className={`${btnPrimary} mt-5`}>
                  Get Forum Details
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* LATEST UPDATES */}
      {props.updates.length > 0 && (
        <section className={`${container} py-16`}>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl font-bold text-brand-black">
              Latest Updates
            </h2>
            <Link
              href="/updates"
              className="font-semibold text-brand-red hover:underline"
            >
              All updates →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {props.updates.map((u) => (
              <article
                key={u.slug}
                className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <time className="text-sm text-neutral-500" dateTime={u.date}>
                  {formatDate(u.date)}
                </time>
                <h3 className="mt-1 text-lg font-bold text-brand-black">
                  <Link href={`/updates/${u.slug}`} className="hover:underline">
                    {u.title}
                  </Link>
                </h3>
                {u.excerpt && (
                  <p className="mt-2 flex-1 text-neutral-700">{u.excerpt}</p>
                )}
                <Link
                  href={`/updates/${u.slug}`}
                  className="mt-4 font-semibold text-brand-green-dark hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* CONTACT / SOCIAL CTA */}
      {home.contactCta && (
        <section className="bg-brand-green-light">
          <div className={`${container} py-16 text-center`}>
            <h2
              className="text-3xl font-bold text-brand-black"
              data-tina-field={tinaField(home.contactCta, "heading")}
            >
              {home.contactCta.heading}
            </h2>
            {home.contactCta.body && (
              <p className="mx-auto mt-3 max-w-2xl text-lg text-neutral-700">
                {home.contactCta.body}
              </p>
            )}
            <div className="mt-6">
              <Link href="/contact" className={btnPrimary}>
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
