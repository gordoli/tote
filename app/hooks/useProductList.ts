import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { Product } from "../lib/types";

export const useProductList = (userId?: string, brandId?: string) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only add userId and brandId if they exist
        const result = await get(
          `/products/${userId ? `?userId=${userId}` : ""}${
            brandId ? `&brandId=${brandId}` : ""
          }`
        );
        setProducts(result.data);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    products,
    error,
  };
};
