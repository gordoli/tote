import { useEffect, useState } from "react";
import { APP_CONST } from "../lib/const";
import Storage from "../lib/storage";
import { User } from "../lib/types";

export const useCurrentUser = () => {
  const res = Storage.getItem(APP_CONST.AUTH);
  const [currUser, setCurrUser] = useState<User>();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  useEffect(() => {
    res.then((data) => {
      setCurrUser(data.user);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    });
  }, []);

  return {
    currUser,
    accessToken,
    refreshToken,
  };
};
