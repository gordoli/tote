import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { ErrorToast } from "react-native-toast-message";

import Storage from "../app/lib/storage";
import { APP_CONST } from "../app/lib/const";
import { useColorScheme } from "@/components/useColorScheme";
import { Text, View } from "./components/Themed";
import { AuthContext } from "../app/lib/globalContext";

/*
  1. Create the config
*/
const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  // success: (props: object) => (
  //   <BaseToast
  //     {...props}
  //     style={{ borderLeftColor: "pink" }}
  //     contentContainerStyle={{ paddingHorizontal: 15 }}
  //     text1Style={{
  //       fontSize: 16,
  //       fontWeight: "400",
  //     }}
  //   />
  // ),
  success: (props: any) => (
    <View className="flex-row items-center w-full h-12 px-6 bg-transparent">
      <View className="flex-row items-center w-full h-full p-4 rounded-lg bg-green">
        <FontAwesome name="check-circle" size={16} color="white" />
        <Text className="ml-2 text-white">{props.text1}</Text>
      </View>
    </View>
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: object) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const [session, setSession] = useState<string | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const userItem = await Storage.getItem(APP_CONST.AUTH);
      if (userItem && userItem.accessToken) {
        setSession(userItem.accessToken.token);
        router.replace("/(tabs)/feed");
      } else {
        router.replace("/(auth)/login");
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (session && segments[0] === '(auth)') {
      router.replace("/(tabs)/feed");
    } else {
      router.replace("/(auth)/login");
    }
  }, [session]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  return (
    <AuthContext.Provider
      value={{
        login: (token) => {
          setSession(token);
        },
        logout: async () => {
          await Storage.setItem(APP_CONST.AUTH, null);
          setSession(null);
        },
        session,
      }}
    >
      <RootLayoutNav />
    </AuthContext.Provider>
  )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ThemeProvider
        value={colorScheme === "dark" ? DefaultTheme : DefaultTheme}
      >
        {/* <ThemeProvider value={DefaultTheme}> */}

        <GestureHandlerRootView style={{ flex: 1 }}>
          {/* <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack> */}
          <Slot />
        </GestureHandlerRootView>
      </ThemeProvider>

      <Toast config={toastConfig} />
    </>
  );
}
