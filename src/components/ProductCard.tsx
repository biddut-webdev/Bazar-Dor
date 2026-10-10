
import Link from "next/link";
import { IProduct } from "../types/product";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps) => {
  const unitText: Record<string, string> = {
    kg: "প্রতি কেজি",
    liter: "প্রতি লিটার",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
    pcs: "প্রতি পিস",
  };

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600 bg-green-50"
      : product.change.dir === "down"
        ? "text-green-600 bg-red-50"
        : "text-gray-500 bg-gray-100";

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "—";

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="card h-full border border-base-300 bg-base-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="card-body p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-base-200">
              <span className="text-3xl">
                {product.image || product.categoryIcon}
              </span>
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold">
                {product.nameBn}
              </h2>

              <p className="mt-1 text-sm text-base-content/60">
                {unitText[product.unit] || `প্রতি ${product.unit}`}
              </p>
            </div>

          </div>

          <div className="mt-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-xs text-base-content/60">
                আজকের দাম
              </p>

              <p className="text-lg font-extrabold">
                {product.today.toLocaleString("bn-BD")} টাকা
              </p>
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${changeColor}`}
            >
              {changeIcon}{" "}
              {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
