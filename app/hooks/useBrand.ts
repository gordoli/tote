import { useState, useEffect, useCallback } from "react";

import { get, post } from "../lib/api";
import { Brand, FeedItem, Category, RankingData } from "../lib/types";

export const useBrand = (brandId: number) => {
  const [loading, setLoading] = useState(true);
  const [loadingTab, setLoadingTab] = useState(true);
  const [brandDetail, setBrandDetail] = useState<Brand | null>(null);
  const [friendsRanked, setFriendsRanked] = useState<FeedItem[] | []>([]);
  const [allRanked, setAllRanked] = useState<FeedItem[] | []>([]);
  const [error, setError] = useState(null);

  const [loadingStep, setLoadingStep] = useState(true);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [rankingData, setRankingData] = useState<RankingData>({
    rate: 0,
    brandId: brandId,
    categoryId: 0,
    link: "",
    image: "",
    name: "",
    description: "",
    // preferProductId: 0,
  });

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

  const handleFetchAllRanked = useCallback(async () => {
    try {
      const resultAllRanked = await get(`/rank-products?brandId=${brandId}`);
      setAllRanked(resultAllRanked.data);
      setLoadingTab(false);
    } catch (err: any) {
      setError(err.message);
      setLoadingTab(false);
    }
  }, []);

  const handleGetCategories = useCallback(async () => {
    try {
      if (categories.length === 0) {
        const result = await get(`/categories`);
        setCategories(result.data);
        setLoadingStep(false);
      } else {
        setLoadingStep(false);
      }
    } catch (err: any) {
      setError(err.message);
      setLoadingStep(false);
    }
  }, []);

  const handleRankProduct = useCallback(async (cb: () => void) => {
    try {
      setLoadingStep(true);
      // const result = await post(`/rank-products`, rankingData);
      // setLoadingStep(false);
      cb && cb();
    } catch (err: any) {
      setError(err.message);
      setLoadingStep(false);
    }
  }, []);

  const handleUpdateRankingData = useCallback((data: RankingData) => {
    setRankingData(data);
  }, []);

  return {
    error,
    loading,
    loadingTab,
    loadingStep,
    allRanked,
    brandDetail,
    friendsRanked,
    categories,
    rankingData,
    handleFetchAllRanked,
    handleGetCategories,
    handleUpdateRankingData,
    handleRankProduct,
  }
}