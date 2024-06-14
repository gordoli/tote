import { useState } from "react";

import { post } from "../lib/api";
import { EmailValidation } from "../lib/helpers";
import { RegistrationForm, RegistrationFormError } from "../lib/types";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<RegistrationFormError>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const validateRegistrationForm = (param: RegistrationForm) => {
    const { email, password, firstName, lastName } = param;
    const newErrors = {...formErrors};
    newErrors.email = EmailValidation(email);
    newErrors.password = !password.trim() ? "Password is required" : "";
    newErrors.firstName = !firstName.trim() ? "First name is required" : "";
    newErrors.lastName = !lastName.trim() ? "Last name is required" : "";
    setFormErrors(newErrors);
    if (!newErrors.email && !newErrors.password && !newErrors.firstName && !newErrors.lastName) {
      return true;
    }
    return false;
  };

  const register = async (param: RegistrationForm, cb: () => void) => {
    if (validateRegistrationForm(param)) {
      setLoading(true);
      const body = {
        email: param.email.trim(),
        password: param.password.trim(),
        firstName: param.firstName.trim(),
        lastName: param.lastName.trim(),
      }
      try {
        const result = await post("/auth/registration", body);
        if (result && result.code === "ok" && result.status === 201) {
          cb && cb();
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      
    }
  };

  return {
    loading,
    formErrors,
    register,
  }
}