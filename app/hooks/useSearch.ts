import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { Brand, User } from "../lib/types";

export const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[] | null>(null);
  const [brands, setBrands] = useState<Brand[] | null>(null);
  const [error, setError] = useState(null);

  const handleGetUsers = async () => {
    try {
      const result = await get(`/users/search?name=${searchTerm}`);
      setUsers(result.data);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    loading,
    users,
    handleGetUsers,
    brands,
    error,
  };
};
