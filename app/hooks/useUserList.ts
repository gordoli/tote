import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { User } from "../lib/types";

export const useUserList = (searchTerm?: string) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Only add username and name queries if they exist
        const result = await get(
          `/searchMembers${
            searchTerm ? `?username=${searchTerm}&name=${searchTerm}` : ""
          }`
        );

        setUsers(result.data);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    loading,
    users,
    error,
  };
};
