import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, Redirect } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import Avatar from "@/app/components/Avatar";
import { CURRENT_USER } from "../lib/types";
import BaseScreenHeader from "../components/BaseScreenHeader";
import { AuthContext } from "../lib/globalContext";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout(props: any) {
  // const colorScheme = useColorScheme();
  const colorScheme = "light";
  const { session } = React.useContext(AuthContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Tote",
          headerLeft: () => <BaseScreenHeader side="left" />,
          headerTitle: () => <BaseScreenHeader side="center" />,
          headerRight: () => <BaseScreenHeader side="right" />,
          headerShadowVisible: false, // removes shadow and border from header
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tote"
        options={{
          title: "Tote",
          headerLeft: () => <BaseScreenHeader side="left" />,
          headerTitle: () => <BaseScreenHeader side="center" />,
          headerRight: () => <BaseScreenHeader side="right" />,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(search)"
        options={{
          title: "",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerShown: false,
        }}
      />
      {/* <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="magic" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          title: "Explorer",
          headerShadowVisible: false,
          headerLeft: () => <ExplorerScreenHeader side="left" />,
          headerTitle: () => <ExplorerScreenHeader side="center" />,
          headerRight: () => <ExplorerScreenHeader side="right" />,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="compass" color={color} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShadowVisible: false,
          headerLeft: () => <BaseScreenHeader side="left" />,
          headerTitle: () => <BaseScreenHeader side="center" />,
          headerRight: () => <BaseScreenHeader side="right" />,
          tabBarIcon: () => <Avatar src={CURRENT_USER.avatar} size="sm" />,
        }}
      />
    </Tabs>
  );
}
