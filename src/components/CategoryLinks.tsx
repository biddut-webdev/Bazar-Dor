
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "@/types/category";

interface ICategoryLinksProps {
  categories: ICategory[];
}

const CategoryLinks = ({
  categories,
}: ICategoryLinksProps) => {
  const pathname = usePathname();

  return (
    <div className="border-t border-base-300">
      <div className="flex items-center gap-6 overflow-x-auto py-3 md:gap-10">

        {/* Home */}
        <Link
          href="/"
          className={`flex items-center gap-2 whitespace-nowrap font-medium ${pathname === "/"
              ? "font-bold text-red-500"
              : "hover:text-green-700"
            }`}
        >
          <span>🏠</span>
          <span>হোম</span>
        </Link>

        {/* Categories */}
        {categories.map((category) => {
          const isActive =
            pathname === `/category/${category.slug}`;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className={`flex items-center gap-2 whitespace-nowrap font-medium ${isActive
                  ? "font-bold text-red-500"
                  : "hover:text-green-700"
                }`}
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryLinks;
