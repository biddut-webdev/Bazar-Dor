import { getAllProducts } from "../lib/api";
import { IProduct } from "@/types/product";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const data = await getAllProducts();

  const products: IProduct[] = data.data ?? data;

  return (
    <div className="overflow-hidden border-y border-base-300 bg-base-100 py-2">
      <MarqueeText direction="right" duration={12}>
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="mr-6 sm:mr-8 md:mr-12 flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm md:text-base"
          >
            <span className="text-lg">
              {product.categoryIcon}
            </span>

            <span className="font-medium">
              {product.nameBn}
            </span>

            <span className="font-semibold">
              ৳{product.today}/{product.unit}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-green-600"
                  : product.change.dir === "down"
                    ? "font-semibold text-red-600"
                    : "font-semibold text-gray-500"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {Math.abs(product.change.pct)}%
            </span>
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;