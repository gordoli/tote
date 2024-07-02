import { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter, Stack } from "expo-router";
import { View, Text } from "@/app/components/Themed";
import {
  Keyboard,
  Platform,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { useRegister } from "../hooks/useRegister";
import { RegistrationForm } from "../lib/types";
import LoadingScreen from "../components/LoadingScreen";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const router = useRouter();
  const { loading, formErrors, register } = useRegister();

  const onGoToLogIn = () => {
    router.replace({
      pathname: "/login",
    });
  };

  const onSignUp = () => {
    const param: RegistrationForm = {
      email,
      password,
      firstName,
      lastName,
    };
    register(param, () => {
      onGoToLogIn();
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
              headerLeft: () => <SignUpScreenHeader onBack={onGoToLogIn} />,
              headerShadowVisible: false,
            }}
          />
          <View className="flex-col items-center justify-center bg-darkBlue h-2/5">
            <Ionicons name="bag" size={64} color="white" />
            <Text className="mt-2 text-3xl font-semibold text-white">tote</Text>
          </View>
          <View className="p-8 bg-white h-3/5 rounded-t-[50px]">
            <View className="bg-white">
              <Text className="pb-1">First name</Text>
              <TextInput
                onChangeText={setFirstName}
                value={firstName}
                placeholder="Enter your first name"
                className={`w-full h-10 p-2 bg-gray-200 rounded-lg ${
                  formErrors.password ? "" : "mb-4"
                }`}
              />
              {formErrors.firstName && (
                <Text className="pb-4 text-red-600">
                  {formErrors.firstName}
                </Text>
              )}
              <Text className="pb-1">Last name</Text>
              <TextInput
                onChangeText={setLastName}
                value={lastName}
                placeholder="Enter your last name"
                className={`w-full h-10 p-2 bg-gray-200 rounded-lg ${
                  formErrors.password ? "" : "mb-4"
                }`}
              />
              {formErrors.lastName && (
                <Text className="pb-4 text-red-600">{formErrors.lastName}</Text>
              )}
              <Text className="pb-1">Email</Text>
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
                    formErrors.password ? "" : "mb-10"
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
              <TouchableOpacity
                className="flex-row items-center justify-center py-3 rounded-lg"
                style={styles.signupButton}
                onPress={onSignUp}
              >
                <Text className="text-sm font-semibold text-white">
                  SIGN UP
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-8">
              <Text className="mr-1 text-center">Already have an account?</Text>
              <TouchableOpacity onPress={onGoToLogIn}>
                <Text className="font-semibold" style={styles.loginButton}>
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const SignUpScreenHeader = ({ onBack }: { onBack?: () => void }) => {
  return (
    <View className="flex-row items-center">
      <Ionicons
        name="chevron-back-outline"
        size={24}
        color="gray"
        onPress={onBack}
      />
    </View>
  );
};

const styles = {
  signupButton: {
    width: "100%",
    backgroundColor: "#0C66E4",
    alignSelf: "center",
  } as ViewStyle,
  loginButton: {
    color: "#0C66E4",
  } as ViewStyle,
  eyePassword: {
    position: "absolute",
    right: 20,
    top: 9,
  } as ViewStyle,
};
