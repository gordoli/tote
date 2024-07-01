import { useState } from "react";
import { useRouter, Stack } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { View, Text } from "@/app/components/Themed";
import {
  KeyboardAvoidingView,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import { useLogin } from "../hooks/useLogin";
import { LogInForm } from "../lib/types";
import LoadingScreen from "../components/LoadingScreen";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const router = useRouter();
  const { loading, formErrors, onLogin } = useLogin();

  const onGoToSignUp = () => {
    router.replace({
      pathname: "/signup",
    });
  };

  const handleLogin = () => {
    const param: LogInForm = {
      email,
      password,
    };
    onLogin(param, (message: string) => {
      Alert.alert(message);
    });
  };

  const onShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="justify-end flex-1 bg-darkBlue">
          <Stack.Screen
            options={{
              title: "",
              headerShadowVisible: false,
            }}
          />
          {/* <View className="items-center">
            <Text className="text-3xl font-semibold">Welcome to Tote1</Text>
            <Text className="text-gray-500">Log in to your account</Text>
          </View> */}
          <View className="p-8 bg-white h-3/5 rounded-t-[50px]">
            <View className="bg-white">
              <Text className="mb-2 text-secondary">Email Address</Text>
              <TextInput
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                className={`w-full h-10 p-2 bg-gray-200 rounded-lg ${
                  formErrors.email ? "" : "mb-4"
                }`}
              />
              {formErrors.email && (
                <Text className="pb-4 text-red-600">{formErrors.email}</Text>
              )}
              <Text className="pb-1">Password</Text>
              <View className="relative w-full">
                <TextInput
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Enter your password"
                  className={`w-full h-10 p-2 bg-gray-200 rounded-lg ${
                    formErrors.email ? "" : "mb-4"
                  }`}
                  secureTextEntry={isShowPassword}
                />
                <TouchableOpacity
                  style={styles.eyePassword}
                  onPress={onShowPassword}
                >
                  <FontAwesome
                    name={`${isShowPassword ? "eye-slash" : "eye"}`}
                    size={20}
                    color="#787878"
                  />
                </TouchableOpacity>
              </View>
              {formErrors.password && (
                <Text className="pb-4 text-red-600">{formErrors.password}</Text>
              )}
              <View className="items-end w-full">
                <Text className="pt-1 pb-10">Forgot Password?</Text>
              </View>
              <TouchableOpacity
                className="flex-row items-center justify-center py-3 rounded-lg"
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text className="text-sm font-semibold text-white">LOGIN</Text>
              </TouchableOpacity>
              <Text className="py-5 text-center text-gray-500">
                Or login using
              </Text>
              <TouchableOpacity
                className="flex-row items-center justify-center py-3 rounded-lg"
                style={styles.loginGoogleButton}
                onPress={() => {}}
              >
                <AntDesign name="google" size={22} color="white" />
                <Text className="px-3 text-sm font-semibold text-white">
                  Google
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center">
              <Text className="text-center">Don't have an account?</Text>
              <TouchableOpacity onPress={onGoToSignUp}>
                <Text className="font-semibold" style={styles.signupButton}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = {
  loginButton: {
    width: "60%",
    backgroundColor: "#0C66E4",
    alignSelf: "center",
  } as ViewStyle,
  loginGoogleButton: {
    width: "60%",
    backgroundColor: "red",
    alignSelf: "center",
  } as ViewStyle,
  signupButton: {
    color: "#0C66E4",
  } as ViewStyle,
  eyePassword: {
    position: "absolute",
    right: 20,
    top: 9,
  } as ViewStyle,
};
