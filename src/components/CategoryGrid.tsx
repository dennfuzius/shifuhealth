import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { urlFor } from "@/sanity/client";
import type { Category } from "@/sanity/queries";

interface CategoryGridProps {
  categories: Category[];
  locale: "de" | "en";
  title: string;
}

export default function CategoryGrid({ categories, locale, title }: CategoryGridProps) {
  const categoriesWithImages = categories.filter((cat) => cat.image);

  if (categoriesWithImages.length === 0) return null;

  return (
    <section className="mb-16">
      <h2 className="font-body text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {categoriesWithImages.map((cat) => (
          <Link
            key={cat._id}
            href={{ pathname: "/blog", params: {} }}
            className="group relative block rounded-2xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {cat.image && (
              <Image
                src={urlFor(cat.image).width(400).height(300).url()}
                alt={cat.image.alt || cat.title[locale]}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <span className="font-body text-sm font-semibold text-white drop-shadow-md">
                {cat.title[locale]}
              </span>
              {cat.description?.[locale] && (
                <p className="font-body text-xs text-white/80 mt-1 line-clamp-2 drop-shadow-sm">
                  {cat.description[locale]}
                </p>
              )}
            </div>
            {cat.color && (
              <div
                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
