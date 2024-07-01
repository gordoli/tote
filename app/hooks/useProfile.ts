import { useState, useEffect } from "react";

import { get, patch, put } from "../lib/api";
import { User } from "../lib/types";
import Toast from "react-native-toast-message";

export const useProfile = (userId?: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get(`/users/${userId}`);
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

  const handleFollowUser = (userId?: string) => {
    try {
      put(`/follows/following/${userId}`, {});
      Toast.show({
        type: "success",
        text1: "Followed user",
        position: "bottom",
      });
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEditUser = (editData: any) => {
    console.log(editData);
    try {
      patch("/users/edit", editData);
      Toast.show({
        type: "success",
        text1: "Profile updated successfully",
        position: "bottom",
      });
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    error,
    handleFollowUser,
    handleEditUser,
  };
};
