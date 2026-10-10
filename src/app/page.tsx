import Banner from "@/components/Banner";
import ProductSections from "@/components/ProductSections";
import { getAllProducts } from "@/lib/api";

const HomePage = async () => {
  const data = await getAllProducts();

  const products = data.data ?? data;

  return (
    <>
      <Banner />

      <ProductSections products={products} />
    </>
  );
};

export default HomePage;