import { Text, View } from "../components/Themed";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import UserList from "../components/user/UserList";
import { useWindowDimensions } from "react-native";
import { User } from "../lib/types";
import { get } from "../lib/api";

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#0065FF" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <View className="flex-row items-center justify-between">
        <Text
          style={{ color: focused ? "#0065FF" : "#787878", margin: 8 }}
          className="text-base font-semibold"
        >
          {route.title}
        </Text>
      </View>
    )}
  />
);

const FollowersScreen = () => {
  const router = useRouter();
  const { currUser } = useCurrentUser();
  const layout = useWindowDimensions();
  const initialIndex: any = useLocalSearchParams();
  const [index, setIndex] = useState(parseInt(initialIndex.initialIndex) || 0);

  const [followers, setFollowers] = useState<User[] | null>([]);
  const [following, setFollowing] = useState<User[] | null>([]);

  const handleGetFollowers = async (userId: string) => {
    try {
      const result = await get(`/follows/${userId}/followers`);
      setFollowers(result.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleGetFollowing = async (userId: string) => {
    try {
      const result = await get(`/follows/${userId}/following`);
      setFollowing(result.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const [routes] = useState([
    { key: "followers", title: "Followers" },
    { key: "following", title: "Following" },
  ]);

  useEffect(() => {
    if (currUser) {
      handleGetFollowers(currUser.id);
      handleGetFollowing(currUser.id);
    }
  }, [currUser]);

  const renderScene = SceneMap({
    followers: () => <UserList users={followers} />,
    following: () => <UserList users={following} />,
  });

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "Tote",
          headerLeft: () => (
            <FollowersScreenHeader
              side="left"
              onBack={() => router.back()}
              label={currUser?.username}
            />
          ),
          headerTitle: () => (
            <FollowersScreenHeader side="center" label={currUser?.username} />
          ),
          headerRight: () => (
            <FollowersScreenHeader side="right" label={currUser?.username} />
          ),
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

export default FollowersScreen;

const FollowersScreenHeader = ({
  side,
  onBack,
  label,
}: {
  side: string;
  onBack?: () => void;
  label?: string;
}) => {
  return (
    <>
      {side === "left" && (
        <View className="flex-row items-center">
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="gray"
            onPress={onBack}
          />
          <Text className="ml-2">{label}</Text>
        </View>
      )}
    </>
  );
};
