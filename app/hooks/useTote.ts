import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { Product } from "../lib/types";

export const useTote = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get("/tote");
        console.log("Tote Result", result.data);

        setData(result.data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error on /feeds", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    data,
    error,
  };
};
