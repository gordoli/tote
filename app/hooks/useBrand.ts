import { Alert, Platform } from "react-native";
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
    image: null,
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

  const handleRankProduct = useCallback(async (data: RankingData, cb: () => void) => {
    try {
      setLoadingStep(true);
      const formData = new FormData();
      const dataBody = data.image ? (
        Platform.OS === "android" ? data.image.uri : data.image.uri.replace('file://', '')
      ) : "";
      formData.append('file', dataBody);
      // const headers = { 'Content-Type': 'multipart/form-data' };
      const result = await post('/files/upload', formData);
      if (result && result.code === "ok" && result.status === 200) {
        try {
          const body = {
            ...data,
            image: result.data,
          }
          const res = await post(`/rank-products`, body);
          if (res.status === 201 && res.code === "ok") {
            cb && cb();
            Alert.alert("Rank product successfully");
          }
          setLoadingStep(false);
        } catch (e: any) {
          setError(e.message);
          setLoadingStep(false);
        }
      } else {
        setLoadingStep(false);
        Alert.alert('Failure', `Upload product's image fail. Please try again`, [
          {
            text: 'Cancel',
            onPress: () => cb(),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              handleRankProduct(data, cb);
            }
          },
        ]);
      }
    } catch (err: any) {
      Alert.alert('Failure', `Upload product's image fail. Please try again`, [
        {
          text: 'Cancel',
          onPress: () => cb(),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            handleRankProduct(data, cb);
          }
        },
      ]);
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