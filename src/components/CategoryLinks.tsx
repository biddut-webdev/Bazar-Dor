
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "@/types/category";

interface ICategoryLinksProps {
  categories: ICategory[];
}

const CategoryLinks = ({ categories }: ICategoryLinksProps) => {
  const pathname = usePathname();

  return (
    <div className="border-t border-gray-200 bg-white">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 py-3 md:gap-x-10">
          {/* Home */}
          <Link
            href="/"
            className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors md:text-base ${pathname === "/"
                ? "font-bold text-red-600"
                : "text-gray-800 hover:text-green-700"
              }`}
          >
            <span>🏠</span>
            <span>হোম</span>
          </Link>

          {/* Categories */}
          {categories.map((category) => {
            const isActive = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors md:text-base ${isActive
                    ? "font-bold text-red-600"
                    : "text-gray-800 hover:text-green-700"
                  }`}
              >
                <span>{category.icon}</span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CategoryLinks;
