import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { Brand } from "../lib/types";

export const useBrandList = (userId?: string, brandId?: string) => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only add userId and brandId if they exist
        const result = await get(
          `/brands/${userId ? `?userId=${userId}` : ""}${
            brandId ? `&brandId=${brandId}` : ""
          }`
        );
        setBrands(result.data);
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
    brands,
    error,
  };
};
