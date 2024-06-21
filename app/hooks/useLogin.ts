import { useState, useContext } from "react";

import { post } from "../lib/api";
import Storage from "../lib/storage";
import { APP_CONST } from "../lib/const";
import { EmailValidation } from "../lib/helpers";
import { LogInForm, LogInFormError } from "../lib/types";
import { AuthContext } from "../lib/globalContext";

export const useLogin = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<LogInFormError>({
    email: "",
    password: "",
  });

  const validateloginForm = (param: LogInForm) => {
    const { email, password } = param;
    const newErrors = {...formErrors};
    newErrors.email = EmailValidation(email);
    newErrors.password = !password.trim() ? "Password is required" : "";
    setFormErrors(newErrors);
    if (!newErrors.email && !newErrors.password) {
      return true;
    }
    return false;
  };

  const onLogin = async (param: LogInForm, cb: (message: string) => void) => {
    if (validateloginForm(param)) {
      setLoading(true);
      const body = {
        username: param.email.trim(),
        password: param.password.trim(),
      }
      try {
        const result = await post("/auth/login", body);
        if (result) {
          if (result.status === 201 && result.code === "ok") {
            Storage.setItem(APP_CONST.AUTH, result.data);
            login(result.data.accessToken.token);
          } else {
            cb && cb(result.message);
          }
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        cb && cb("User not found. Please check your credentials and try again.");
      }
    }
  };

  return {
    loading,
    formErrors,
    onLogin,
  }
}