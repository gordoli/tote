import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { FeedActivity } from "../lib/types";

export const useFeed = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FeedActivity[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get("/feeds?page=1&perPage=10");
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
