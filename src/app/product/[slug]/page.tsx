
import Link from "next/link";
import { getAllProducts } from "@/lib/api";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

interface IProductDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailsPage = async ({
  params,
}: IProductDetailsPageProps) => {
  const { slug } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const data = await getAllProducts();
  const products = data.data ?? data;

  const product = products.find(
    (item: { slug: string }) => item.slug === slug
  );

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eff4ef]">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            পণ্য পাওয়া যায়নি 😕
          </h1>
          <Link href="/" className="btn mt-5">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
    );
  }

  const markets = product.markets ?? [];

  const minPrice = markets.length
    ? Math.min(...markets.map((m: { min: number }) => m.min))
    : product.today;

  const maxPrice = markets.length
    ? Math.max(...markets.map((m: { max: number }) => m.max))
    : product.today;

  const avgPrice = Math.round(
    (minPrice + maxPrice) / 2
  );

  const money = (value: number) =>
    value.toLocaleString("bn-BD");

  return (
    <main className="min-h-screen bg-[#eff4ef] text-[#26352b]">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-5xl px-5 pt-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span className="mx-2">›</span>
        <span>{product.categoryNameBn}</span>
        <span className="mx-2">›</span>
        <span>{product.nameBn}</span>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-7">

        {/* Product Information */}
        <section className="flex flex-col justify-between gap-5 rounded-2xl border border-[#e0e9e0] bg-white p-6 shadow-sm sm:flex-row sm:items-center md:p-8">

          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f0] text-4xl">
              {product.image || product.categoryIcon}
            </div>

            <div>
              <h1 className="text-2xl font-extrabold md:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                প্রতি {product.unit}
              </p>


              <p className="mt-2 text-sm">
                গতকালের তুলনায় আজকের দাম{" "}
                <strong
                  className={
                    product.today > product.yesterday
                      ? "text-red-500"
                      : product.today < product.yesterday
                        ? "text-green-600"
                        : "text-gray-500"
                  }
                >
                  {product.today > product.yesterday
                    ? `বেড়েছে · ${(
                      product.today - product.yesterday
                    ).toLocaleString("bn-BD")} টাকা`
                    : product.today < product.yesterday
                      ? `কমেছে · ${(
                        product.yesterday - product.today
                      ).toLocaleString("bn-BD")} টাকা`
                      : "কোনো পরিবর্তন হয়নি"}
                </strong>
              </p>

            </div>
          </div>

          <div className="min-w-32 rounded-2xl bg-[#f0f5f0] px-6 py-4 text-center">
            <p className="text-sm text-gray-500">
              আজকের দাম
            </p>

            <p className="text-3xl font-extrabold">
              {money(product.today)}
            </p>

            <p className="text-sm text-gray-500">
              টাকা / {product.unit}
            </p>

            <p
              className={`mt-1 text-sm font-bold ${product.change.dir === "up"
                ? "text-red-500"
                : product.change.dir === "down"
                  ? "text-green-600"
                  : "text-gray-500"
                }`}
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {money(Math.abs(product.change.pct))}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-5 rounded-2xl border border-[#e0e9e0] bg-white p-5 md:p-7">

          <h2 className="mb-4 text-lg font-bold">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid gap-3 sm:grid-cols-3">

            <div className="rounded-2xl border border-[#e0e9e0] p-5">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>
              <p className="mt-1 text-2xl font-extrabold text-green-600">
                {money(minPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-[#e0e9e0] p-5">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>
              <p className="mt-1 text-2xl font-extrabold text-red-500">
                {money(maxPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="rounded-2xl border border-[#e0e9e0] p-5">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>
              <p className="mt-1 text-2xl font-extrabold text-green-600">
                {money(avgPrice)} টাকা
              </p>
              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit}-এর হিসাবে
              </p>
            </div>

          </div>

          {/* Market Table */}
          <h2 className="mb-4 mt-6 text-lg font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-[#e0e9e0]">
            <table className="w-full min-w-[650px] border-collapse text-sm">

              <thead>
                <tr className="bg-[#f8faf8] text-left text-gray-500">
                  <th className="px-4 py-4">বাজার</th>
                  <th className="px-4 py-4">বিভাগ</th>
                  <th className="px-4 py-4 text-right">
                    সর্বনিম্ন
                  </th>
                  <th className="px-4 py-4 text-right">
                    সর্বোচ্চ
                  </th>
                  <th className="px-4 py-4 text-right">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map(
                  (
                    market: {
                      market: string;
                      division: string;
                      min: number;
                      max: number;
                    },
                    index: number
                  ) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className={`border-t border-[#dfe6df] ${index % 2 === 0
                        ? "bg-[#f8faf8]"
                        : "bg-[#eff4ef]"
                        } hover:bg-[#e6f1e7]`}
                    >
                      <td className="px-4 py-4 font-medium">
                        {market.market}
                      </td>

                      <td className="px-4 py-4">
                        {market.division}
                      </td>

                      <td className="px-4 py-4 text-right">
                        {money(market.min)} টাকা
                      </td>

                      <td className="px-4 py-4 text-right">
                        {money(market.max)} টাকা
                      </td>

                      <td className="px-4 py-4 text-right font-bold">
                        {money(
                          Math.round(
                            (market.min + market.max) / 2
                          )
                        )} টাকা
                      </td>
                    </tr>
                  )
                )}

                {markets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      বাজারের তথ্য এখনো পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </section>

      </div>
    </main>
  );
};

export default ProductDetailsPage;
