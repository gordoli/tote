import { useState } from "react";
import { useRouter, Stack } from 'expo-router';
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { View, Text } from "@/app/components/Themed";
import { KeyboardAvoidingView, ViewStyle, TextInput, TouchableOpacity, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";

import { EmailValidation } from "./lib/helpers";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const router = useRouter();

  const onGoToSignUp = () => {
    router.replace({
      pathname: "/signup",
    });
  };

  const onLogin = () => {
    setEmailError(EmailValidation(email));
  };

  const onShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-around p-4 gap-4">
          <Stack.Screen
              options={{
                title: "",
                headerShadowVisible: false,
              }}
            />
          <View className="items-center">
            <Text className="text-3xl font-semibold">Welcome to Tote</Text>
            <Text className="text-gray-500">Log in to your account</Text>
          </View>
          <View>
            <Text className="pb-1">Email</Text>
            <TextInput
              onChangeText={setEmail}
              value={email}
              placeholder="Enter your email"
              className={`w-full h-10 p-2 bg-gray-200 rounded-lg ${emailError ? '' : 'mb-4'}`}
            />
            {emailError && <Text className="pb-4 text-red-600">{emailError}</Text>}
            <Text className="pb-1">Password</Text>
            <View className="w-full relative">
              <TextInput
                onChangeText={setPassword}
                value={password}
                placeholder="Enter your password"
                className="w-full h-10 p-2 bg-gray-200 rounded-lg"
                secureTextEntry={isShowPassword}
              />
              <TouchableOpacity style={styles.eyePassword} onPress={onShowPassword}>
                <FontAwesome name={`${isShowPassword ? 'eye-slash' : 'eye'}`} size={20} color="#787878" />
              </TouchableOpacity>
            </View>
            <View className="w-full items-end">
              <Text className="pb-10 pt-1">Forgot Password?</Text>
            </View>
            <TouchableOpacity
              className="flex-row justify-center items-center rounded-lg py-3"
              style={styles.loginButton}
              onPress={onLogin}
            >
              <Text className="text-sm text-white font-semibold">LOGIN</Text>
            </TouchableOpacity>
            <Text className="text-center text-gray-500 py-5">Or login using</Text>
            <TouchableOpacity
              className="flex-row justify-center items-center rounded-lg py-3"
              style={styles.loginGoogleButton}
              onPress={() => {}}
            >
              <AntDesign name="google" size={22} color="white" />
              <Text className="text-sm text-white font-semibold px-3">Google</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Text className="text-center">Don't have an account?</Text>
            <TouchableOpacity onPress={onGoToSignUp}>
              <Text className="font-semibold" style={styles.signupButton}> Sign Up</Text>
            </TouchableOpacity>
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
    backgroundColor: '#0C66E4',
    alignSelf: "center",
  } as ViewStyle,
  loginGoogleButton: {
    width: "60%",
    backgroundColor: 'red',
    alignSelf: "center",
  } as ViewStyle,
  signupButton: {
    color: '#0C66E4',
  } as ViewStyle,
  eyePassword: {
    position: "absolute",
    right: 20,
    top: 9,
  } as ViewStyle,
};
