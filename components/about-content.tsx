"use client";

import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import type { AboutQuery } from "@/tina/__generated__/types";
import RichText from "@/components/rich-text";
import { container } from "@/lib/ui";

type Props = {
  data: AboutQuery;
  query: string;
  variables: { relativePath: string };
};

export default function AboutContent(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const about = data.about;

  const sections = [about.mission, about.vision, about.history].filter(Boolean);

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-green-light">
        <div className={`${container} py-14 sm:py-20`}>
          <h1
            className="text-4xl font-extrabold text-brand-black sm:text-5xl"
            data-tina-field={
              about.hero ? tinaField(about.hero, "heading") : undefined
            }
          >
            {about.hero?.heading ?? "About Us"}
          </h1>
          {about.hero?.subheading && (
            <p className="mt-4 max-w-2xl text-lg text-neutral-700">
              {about.hero.subheading}
            </p>
          )}
        </div>
      </section>

      <div className={`${container} space-y-12 py-16`}>
        {/* Mission / Vision / History */}
        {sections.map((section, i) =>
          section ? (
            <section key={i} className="max-w-3xl">
              <h2
                className="text-2xl font-bold text-brand-green-dark"
                data-tina-field={tinaField(section, "heading")}
              >
                {section.heading}
              </h2>
              <div
                className="mt-3"
                data-tina-field={tinaField(section, "body")}
              >
                <RichText content={section.body} />
              </div>
            </section>
          ) : null,
        )}

        {/* What We Do */}
        {about.whatWeDo && (
          <section>
            <h2
              className="text-2xl font-bold text-brand-green-dark"
              data-tina-field={tinaField(about.whatWeDo, "heading")}
            >
              {about.whatWeDo.heading}
            </h2>
            <div className="mt-3 max-w-3xl">
              <RichText content={about.whatWeDo.body} />
            </div>
            {about.whatWeDo.items && about.whatWeDo.items.length > 0 && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {about.whatWeDo.items.map((item, i) =>
                  item ? (
                    <div
                      key={i}
                      className="rounded-xl border-l-4 border-brand-gold bg-white p-5 shadow-sm"
                    >
                      <h3 className="text-lg font-bold text-brand-black">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-neutral-700">
                        {item.description}
                      </p>
                    </div>
                  ) : null,
                )}
              </div>
            )}
          </section>
        )}

        {/* Leadership — only rendered if data is provided */}
        {about.leadership && about.leadership.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-brand-green-dark">
              Leadership
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {about.leadership.map((person, i) =>
                person ? (
                  <div
                    key={i}
                    className="rounded-xl border border-neutral-200 bg-white p-5 text-center shadow-sm"
                  >
                    {person.photo && (
                      <Image
                        src={person.photo}
                        alt={
                          person.name ? `${person.name}` : "Leadership photo"
                        }
                        width={120}
                        height={120}
                        className="mx-auto h-28 w-28 rounded-full object-cover"
                      />
                    )}
                    <h3 className="mt-3 text-lg font-bold text-brand-black">
                      {person.name}
                    </h3>
                    {person.role && (
                      <p className="text-sm font-semibold text-brand-red">
                        {person.role}
                      </p>
                    )}
                    {person.bio && (
                      <p className="mt-2 text-sm text-neutral-700">
                        {person.bio}
                      </p>
                    )}
                  </div>
                ) : null,
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
