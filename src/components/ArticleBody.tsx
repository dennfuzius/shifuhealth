"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/client";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-body mb-5" style={{ lineHeight: 1.85, color: "var(--color-text-body)" }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className="font-body font-bold"
        style={{ marginTop: "2rem", marginBottom: "0.75rem", lineHeight: 1.2 }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="font-body font-bold"
        style={{ marginTop: "1.5rem", marginBottom: "0.5rem", lineHeight: 1.3 }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="font-body italic my-8"
        style={{
          borderLeft: "3px solid var(--color-gold)",
          paddingLeft: "1rem",
          color: "var(--color-text-secondary)",
          fontSize: "1.1rem",
          lineHeight: 1.7,
        }}
      >
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong style={{ fontWeight: 500, color: "var(--color-text)" }}>{children}</strong>
    ),
    em: ({ children }) => (
      <em className="font-body" style={{ fontStyle: "italic" }}>{children}</em>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="transition-colors duration-200"
        style={{
          color: "var(--color-accent)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
        onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-7" style={{ paddingLeft: "1.5rem", lineHeight: 1.85 }}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-7" style={{ paddingLeft: "1.5rem", lineHeight: 1.85 }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li
        className="font-body mb-2"
        style={{ color: "var(--color-text-body)", listStyleType: "disc" }}
      >
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li
        className="font-body mb-2"
        style={{ color: "var(--color-text-body)", listStyleType: "decimal" }}
      >
        {children}
      </li>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-10">
          <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 720px) 100vw, 720px"
            />
          </div>
          {value.caption && (
            <figcaption
              className="font-body text-sm text-center mt-3"
              style={{ color: "var(--color-text-muted)" }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function ArticleBody({ content }: { content: unknown[] }) {
  if (!content || !Array.isArray(content) || content.length === 0) return null;

  return (
    <div className="article-body mx-auto" style={{ maxWidth: 720 }}>
      <PortableText
        value={content as Array<Record<string, unknown> & { _type: string; _key: string }>}
        components={components}
      />
    </div>
  );
}
