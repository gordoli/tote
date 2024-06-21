import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { User } from "../lib/types";

export const useProfile = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get("/users/me");
        setData(result.data);
        setLoading(false);
      } catch (err: any) {
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
  }
}