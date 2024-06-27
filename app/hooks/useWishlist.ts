import { useState, useEffect, useCallback } from "react";

import { get, post } from "../lib/api";
import { Product } from "../lib/types";
import { useCurrentUser } from "./useCurrentUser";

export const useWishlist = (getWishlist?: boolean) => {
  const [loading, setLoading] = useState(true);
  const [wishlistProducts, setWishlistProducts] = useState<Product[] | null>(
    null
  );
  const [error, setError] = useState(null);
  const { currUser } = useCurrentUser();

  useEffect(() => {
    if (getWishlist && currUser) {
      const fetchData = async () => {
        try {
          const result = await get(`/wishlist/${currUser?.id}`);
          console.log(`/wishlist/${currUser?.id}`);

          setWishlistProducts(result.data.products);
          setLoading(false);
        } catch (err: any) {
          console.log(err);
          setError(err.message);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [currUser]);

  const handleAddToWishlist = useCallback(async (productId: number) => {
    console.log("Adding product to wishlist", productId);
    try {
      await post(`/wishlist/add/${productId}`, {});
      console.log("Added product to wishlist");
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  }, []);

  return {
    loading,
    wishlistProducts,
    error,
    handleAddToWishlist,
  };
};
