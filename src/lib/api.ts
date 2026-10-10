
const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

// সব product
export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  return res.json();
};

// Category অনুযায়ী product
export const getProductsByCategory = async (slug: string) => {
  const res = await fetch(
    `${BASE_URL}/products?category=${encodeURIComponent(slug)}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch category products: ${res.status}`);
  }

  return res.json();
};

// সব category
export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  return res.json();
};
