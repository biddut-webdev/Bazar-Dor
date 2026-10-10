
import { ICategory } from "@/types/category";
import CategoryLinks from "./CategoryLinks";

const NavLinks = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Categories API failed:", res.status);
    return <CategoryLinks categories={[]} />;
  }

  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    console.error("Categories API did not return JSON:", contentType);
    return <CategoryLinks categories={[]} />;
  }

  const data = await res.json();
  const categories: ICategory[] = data.data ?? data;

  return <CategoryLinks categories={categories} />;
};

export default NavLinks;
