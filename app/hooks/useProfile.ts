import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";

import { get, patch, put, del, post } from "../lib/api";
import { Brand, Product, User } from "../lib/types";
import Toast from "react-native-toast-message";
import { ImagePickerAsset } from "expo-image-picker";

export const useProfile = (userId?: string) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [error, setError] = useState(null);
  const [formChangePasswordErrors, setFormChangePasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

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

  const handleUploadAvatar = async (editData: any, avatar: ImagePickerAsset | null) => {
    setLoading(true);
    if (avatar === null) {
      handleEditUser(editData);
    } else {
      try {
        const formData = new FormData();
        let filename = avatar ? avatar.uri.split("/").pop() : "";
        let type = avatar ? avatar.mimeType : "image";
        const localUri = avatar
          ? Platform.OS === "android"
            ? avatar.uri
            : avatar.uri.replace("file://", "")
          : "";
        const dataBody = { uri: localUri, name: filename, type };
        formData.append("file", dataBody);
        const headers = { "Content-Type": "multipart/form-data" };
        const result = await post("/files/upload", formData, headers);
        if (result && result.code === "ok" && result.status === 201) {
          const body = {
            ...editData,
            avatar: result.data,
          };
          handleEditUser(body);
        } else {
          handleEditUser(editData);
        }
      } catch (error) {
        handleEditUser(editData);
      }
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

  const handleChangePassword = async (data: any, cb: () => void) => {
    if (validateChangePasswordForm(data)) {
      setLoading(true);
      const body = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }
      try {
        const result = await post("/auth/change-password", body);
        if (result && result.code === "ok" && result.status === 201) {
          Toast.show({
            type: "success",
            text1: "Password updated successfully",
            position: "bottom",
          });
          setTimeout(() => {
            cb && cb();
          }, 1000);
        } else {
          Alert.alert(result.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const validateChangePasswordForm = (data: any) => {
    const { currentPassword, newPassword, confirmNewPassword } = data;
    const newFormChangePasswordErrors = {...formChangePasswordErrors};
    newFormChangePasswordErrors.currentPassword = !currentPassword.trim() ? "Current password is required" : "";
    newFormChangePasswordErrors.newPassword = !newPassword.trim() ? "New password is required" : "";
    newFormChangePasswordErrors.confirmNewPassword =
      confirmNewPassword.trim() === newPassword.trim() ? "" : "New passwords does not match";
    setFormChangePasswordErrors(newFormChangePasswordErrors);
    if (
      !newFormChangePasswordErrors.currentPassword &&
      !newFormChangePasswordErrors.newPassword &&
      !newFormChangePasswordErrors.confirmNewPassword
    ) {
      return true;
    }
    return false;
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
    handleChangePassword,
    formChangePasswordErrors,
    handleUploadAvatar,
  };
};
