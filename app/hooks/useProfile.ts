import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { User } from "../lib/types";

export const useProfile = (userId?: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result =
          userId && userId !== ""
            ? await get(`/users/${userId}`)
            : await get("/users/me");
        setData(result.data);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollowUser = () => {};

  return {
    loading,
    data,
    error,
    handleFollowUser,
  };
};
