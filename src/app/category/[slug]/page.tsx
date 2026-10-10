
import Link from "next/link";
import { getCategories, getProductsByCategory } from "@/lib/api";
import CategorySort from "@/components/CategorySort";

interface ICategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const CategoryPage = async ({ params }: ICategoryPageProps) => {
  const { slug } = await params;

  const categoriesData = await getCategories();
  const categories = categoriesData.data ?? categoriesData;

  const category = categories.find(
    (item: { slug: string }) => item.slug === slug
  );

  if (!category) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl">😕</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            ক্যাটাগরি পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>
          <Link href="/" className="btn btn-success mt-5 text-white">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const productsData = await getProductsByCategory(slug);
  const products = productsData.data ?? productsData;

  if (!products.length) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl">{category.icon}</div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            কোনো পণ্য পাওয়া যায়নি
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>
          <Link href="/" className="btn btn-success mt-5 text-white">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#f0f6f1]">
      <div className="mx-auto max-w-6xl px-4 py-7 md:py-8">

        {/* Category Header */}
        <section className="mb-5 flex items-center gap-3 rounded-2xl border border-[#e0e9e1] bg-[#fbfdfb] p-4 sm:p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f0f6f1] text-2xl">
            {category.icon}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              {category.nameBn}
            </h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sort Bar */}
        <section className="mb-4 min-h-16 items-center gap-3 rounded-2xl border border-[#e0e9e1] bg-[#fbfdfb] px-4 py-2">
          <p className="text-xs text-gray-500 sm:text-sm">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </p>

          <div className="shrink-0">
            <CategorySort products={products} />
          </div>
        </section>

      </div>
    </main>
  );
};

export default CategoryPage;
