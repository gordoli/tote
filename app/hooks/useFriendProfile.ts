import { useState } from "react";

import { get } from "../lib/api";
import { User } from "../lib/types";

export const useFriendProfile = (userId: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState(null);

  const handleGetUserById = async () => {
    try {
      const result = await get(`/users/${userId}`);
      setData(result.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleFollowUser = () => {};

  return {
    loading,
    data,
    error,
    handleFollowUser,
    handleGetUserById,
  }
}