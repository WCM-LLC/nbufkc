"use client";

import Link from "next/link";
import Image from "next/image";
import { useTina, tinaField } from "tinacms/dist/react";
import type { UpdateQuery } from "@/tina/__generated__/types";
import RichText from "@/components/rich-text";
import { formatDate } from "@/lib/format";
import { container } from "@/lib/ui";

type Props = {
  data: UpdateQuery;
  query: string;
  variables: { relativePath: string };
};

export default function UpdateContent(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const post = data.update;

  return (
    <article className={`${container} max-w-3xl py-16`}>
      <Link
        href="/updates"
        className="text-sm font-semibold text-brand-green-dark hover:underline"
      >
        ← All updates
      </Link>

      <time
        className="mt-6 block text-sm text-neutral-500"
        dateTime={post.date}
      >
        {formatDate(post.date)}
      </time>
      <h1
        className="mt-1 text-4xl font-extrabold text-brand-black"
        data-tina-field={tinaField(post, "title")}
      >
        {post.title}
      </h1>

      {post.coverImage && (
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          className="mt-6 w-full rounded-xl object-cover"
          priority
        />
      )}

      <div className="mt-8 text-lg" data-tina-field={tinaField(post, "body")}>
        <RichText content={post.body} />
      </div>
    </article>
  );
}
