import { IProduct } from "../types/product";
import ProductCard from "./ProductCard";

interface IProductSectionsProps {
  products: IProduct[];
}

const ProductSections = ({
  products,
}: IProductSectionsProps) => {
  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">

      {/* Section A */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold md:text-3xl">
            <span className="text-red-600 text-2xl">▲</span>
            আজ দাম বেড়েছে
          </h2>

        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {risers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

      {/* Section B */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold md:text-3xl">
            <span className="text-green-600 text-2xl">▼</span>
            আজ দাম কমেছে
          </h2>

        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fallers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

      {/* Section C */}
      <div id="সব-পণ্য">
        <div className="mb-6">
          <h2 className="text-2xl font-bold md:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-1 text-sm text-base-content/60">
            বাজারের সকল পণ্যের আজকের সর্বশেষ দাম
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

    </section>
  );
};

export default ProductSections;