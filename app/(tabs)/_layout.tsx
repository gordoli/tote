import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { FeedScreenHeader } from "./feed";
import Avatar from "@/app/components/Avatar";
import { ProfileScreenHeader } from "./profile";
import { CURRENT_USER } from "../lib/types";
import { ToteScreenHeader } from "./tote";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const colorScheme = "dark";

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
          headerLeft: () => <FeedScreenHeader side="left" />,
          headerTitle: () => <FeedScreenHeader side="center" />,
          headerRight: () => <FeedScreenHeader side="right" />,
          headerShadowVisible: false, // removes shadow and border from header
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tote"
        options={{
          title: "Tote",
          headerLeft: () => <ToteScreenHeader side="left" />,
          headerTitle: () => <ToteScreenHeader side="center" />,
          headerRight: () => <ToteScreenHeader side="right" />,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="magic" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShadowVisible: false,
          headerLeft: () => <ProfileScreenHeader side="left" />,
          headerTitle: () => <ProfileScreenHeader side="center" />,
          headerRight: () => <ProfileScreenHeader side="right" />,
          tabBarIcon: () => <Avatar src={CURRENT_USER.avatar} size="sm" />,
        }}
      />
    </Tabs>
  );
}
