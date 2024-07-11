import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { FeedActivity } from "../lib/types";

export const useFeed = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<FeedActivity[] | null>(null);
  const [error, setError] = useState(null);
  const [userFeed, setUserFeed] = useState<FeedActivity[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get("/feeds?isOnlyFriend=true&page=1&perPage=10");
        // const result = await get("/feeds?&page=1&perPage=10");
        console.log("Feed Data:", result.data);
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

  const handleGetUserFeed = async (userId: string) => {
    try {
      const result = await get(`/feeds?createdBy=${userId}`);
      console.log("User Feed Data:", result.data);
      setUserFeed(result.data);
    } catch (err: any) {
      console.error("Error on /feeds", err);
      setError(err.message);
    }
  };

  return {
    loading,
    data,
    error,
    userFeed,
    handleGetUserFeed,
  };
};
