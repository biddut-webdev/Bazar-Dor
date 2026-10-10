
"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "../types/product";

interface ICategorySortProps {
  products: IProduct[];
}

const CategorySort = ({
  products,
}: ICategorySortProps) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort(
    (a, b) => {
      if (sort === "low") {
        return a.today - b.today;
      }

      if (sort === "high") {
        return b.today - a.today;
      }

      return 0;
    }
  );

  return (
    <>
      {/* Sort Control */}
      <div className="mb-6 flex justify-end items-center gap-2">
        <p> সাজান</p>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full sm:w-auto"
        >

          <option value="default">

            ডিফল্ট
          </option>

          <option value="low">
            দাম: কম থেকে বেশি
          </option>

          <option value="high">
            দাম: বেশি থেকে কম
          </option>
        </select>

      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}

      </div>
    </>
  );
};

export default CategorySort;
