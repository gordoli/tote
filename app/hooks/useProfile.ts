import { useState, useEffect } from "react";

import { get, patch, put, del } from "../lib/api";
import { Brand, Product, User } from "../lib/types";
import Toast from "react-native-toast-message";

export const useProfile = (userId?: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [brands, setBrands] = useState<Brand[] | null>(null);
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

  const handleGetProducts = async () => {
    try {
      const result = await get(`/users/${userId}/products`);
      setProducts(result.data);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  const handleGetBrands = async () => {
    try {
      const result = await get(`/users/${userId}/brands`);
      setBrands(result.data);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  const handleFollowUser = (userId: string, isFollowing: boolean) => {
    try {
      console.log(`${!isFollowing ? "Followed" : "Unfollow"}`, userId);
      if (!isFollowing) {
        put(`/follows/following/${userId}`, {});
      } else {
        del(`/follows/following/${userId}`, {});
      }
      Toast.show({
        type: "success",
        text1: `${!isFollowing ? "Followed" : "Unfollow"} user`,
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
    products,
    brands,
    handleGetProducts,
    handleGetBrands,
  };
};
