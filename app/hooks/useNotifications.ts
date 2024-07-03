import { useState, useEffect } from "react";

import { get } from "../lib/api";
import { Notification } from "../lib/types";

export const useNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [notis, setNotifications] = useState<Notification[] | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await get("/notifications");
        setNotifications(result.data);
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
    notis,
    error,
  };
};
