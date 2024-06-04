import { useState } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter, Stack } from 'expo-router';
import { View, Text } from "@/app/components/Themed";
import { Keyboard, Platform, ViewStyle, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";

import { EmailValidation } from "./lib/helpers";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(true);
  const router = useRouter();

  const onGoToLogIn = () => {
    router.replace({
      pathname: "/login",
    });
  };

  const onSignUp = () => {
    const error = EmailValidation(email);
    setEmailError(error);
    if (!error) {
      onGoToLogIn();
    }
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
              headerLeft: () => <SignUpScreenHeader onBack={onGoToLogIn} />,
              headerShadowVisible: false,
            }}
          />
          <View className="items-center">
            <Text className="text-3xl font-semibold">Let's Get Started</Text>
            <Text className="text-gray-500">Create an account</Text>
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
            <Text className="pb-1">First name</Text>
            <TextInput
              onChangeText={setFirstName}
              value={firstName}
              placeholder="Enter your first name"
              className="w-full h-10 p-2 bg-gray-200 rounded-lg mb-4"
            />
            <Text className="pb-1">Last name</Text>
            <TextInput
              onChangeText={setLastName}
              value={lastName}
              placeholder="Enter your last name"
              className="w-full h-10 p-2 bg-gray-200 rounded-lg mb-10"
            />
            <TouchableOpacity
              className="flex-row justify-center items-center rounded-lg py-3"
              style={styles.signupButton}
              onPress={onSignUp}
            >
              <Text className="text-sm text-white font-semibold">SIGN UP</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Text className="text-center">Already have an account?</Text>
            <TouchableOpacity onPress={onGoToLogIn}>
              <Text className="font-semibold" style={styles.loginButton}> Login here</Text>
            </TouchableOpacity>
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
    width: "60%",
    backgroundColor: '#0C66E4',
    alignSelf: "center",
  } as ViewStyle,
  loginButton: {
    color: '#0C66E4',
  } as ViewStyle,
  eyePassword: {
    position: "absolute",
    right: 20,
    top: 9,
  } as ViewStyle,
};
