"use client";

import { TinaMarkdown, type TinaMarkdownContent } from "tinacms/dist/rich-text";

/**
 * Renders TinaCMS rich-text content with the site's prose styles.
 * Safely returns null when there is no content.
 */
export default function RichText({
  content,
  className,
}: {
  content?: TinaMarkdownContent | TinaMarkdownContent[] | null;
  className?: string;
}) {
  if (!content) return null;
  return (
    <div className={`prose-nbuf ${className ?? ""}`}>
      <TinaMarkdown content={content} />
    </div>
  );
}
