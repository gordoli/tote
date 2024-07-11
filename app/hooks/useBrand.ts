import { Alert, Platform } from "react-native";
import { useState, useEffect, useCallback } from "react";

import { get, post, put } from "../lib/api";
import { Brand, FeedItem, Category, RankingData, Product } from "../lib/types";
import { router } from "expo-router";

export const useBrand = (brandId?: number, userId?: string) => {
  const [loading, setLoading] = useState(true);
  const [loadingTab, setLoadingTab] = useState(true);
  const [brandDetail, setBrandDetail] = useState<Brand | null>(null);
  const [friendsRanked, setFriendsRanked] = useState<Product[] | []>([]);
  const [allRanked, setAllRanked] = useState<Product[] | []>([]);
  const [error, setError] = useState(null);

  const [loadingStep, setLoadingStep] = useState(true);
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [rankingData, setRankingData] = useState<RankingData>({
    rate: 0,
    brandId: brandId || 0,
    categoryId: 0,
    link: "",
    image: null,
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultBrand = await get(`/brands/${brandId}`);
        setBrandDetail(resultBrand.data);
        const resultFriendsRanked = await get(
          `/products?brandId=${brandId}&isOnlyFriend=true`
        );
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
      const resultAllRanked = await get(`/products?brandId=${brandId}`);
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

  const handleRankProduct = useCallback(
    async (data: RankingData, cb: () => void, productId = 0) => {
      try {
        setLoadingStep(true);
        const formData = new FormData();
        if (!data.image) {
          productId === 0 ? await post(`/products`, data) : await put(`/products/${productId}`, data);
          router.back();
          return;
        }
        if (typeof data.image === "string" && !!data.image) {
          const body = {
            ...data,
            image: data.image,
          };
          try {
            productId === 0 ? await post(`/products`, body) : await put(`/products/${productId}`, body);
            setLoadingStep(false);
            router.back();
          } catch (e: any) {
            setError(e.message);
            setLoadingStep(false);
          }
        } else {
          let filename = data.image ? data.image.uri.split("/").pop() : "";
          let type = data.image ? data.image.mimeType : "image";
          const localUri = data.image
            ? Platform.OS === "android"
              ? data.image.uri
              : data.image.uri.replace("file://", "")
            : "";
          const dataBody = { uri: localUri, name: filename, type };
          formData.append("file", dataBody);
          const headers = { "Content-Type": "multipart/form-data" };
          const result = await post("/files/upload", formData, headers);
          if (result && result.code === "ok" && result.status === 201) {
            try {
              const body = {
                ...data,
                image: result.data,
              };
              productId === 0 ? await post(`/products`, body) : await put(`/products/${productId}`, body);
              setLoadingStep(false);
              router.back();
            } catch (e: any) {
              setError(e.message);
              setLoadingStep(false);
            }
          } else {
            setLoadingStep(false);
            Alert.alert(
              "Failure",
              `Upload product's image fail. Please try again`,
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    handleRankProduct(data, cb);
                  },
                },
              ]
            );
          }
        }
      } catch (err: any) {
        Alert.alert(
          "Failure",
          `Upload product's image fail. Please try again`,
          [
            {
              text: "Cancel",
              onPress: () => {},
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                handleRankProduct(data, cb);
              },
            },
          ]
        );
        setError(err.message);
        setLoadingStep(false);
      }
    },
    []
  );

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
  };
};
