import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { Brand, FeedItem } from "../lib/types";

export const useBrand = (brandId: number) => {
  const [loading, setLoading] = useState(true);
  const [loadingTab, setLoadingTab] = useState(true);
  const [brandDetail, setBrandDetail] = useState<Brand | null>(null);
  const [friendsRanked, setFriendsRanked] = useState<FeedItem[] | []>([]);
  const [allRanked, setAllRanked] = useState<FeedItem[] | []>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultBrand = await get(`/brands/${brandId}`);
        const resultFriendsRanked = await get(`/rank-products?${brandId}&isOnlyFriend`);
        setBrandDetail(resultBrand.data);
        setFriendsRanked(resultFriendsRanked.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFetchAllRanked = async () => {
    try {
      setLoadingTab(true);
      const resultAllRanked = await get(`/rank-products?brandId=${brandId}`);
      setAllRanked(resultAllRanked.data);
      setLoadingTab(false);
    } catch (err: any) {
      setError(err.message);
      setLoadingTab(false);
    }
  };

  return {
    error,
    loading,
    loadingTab,
    allRanked,
    brandDetail,
    friendsRanked,
    handleFetchAllRanked,
  }
}