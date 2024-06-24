import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import {
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";

import Avatar from "../components/Avatar";
import ToteTitle from "../components/ToteTitle";
import { View, Text } from "@/app/components/Themed";
import { FeedItem, UserStats, Brand } from "@/app/lib/types";
import ProductCard from "../components/ProductCard";
import Storage from "../lib/storage";
import { AuthContext } from "../lib/globalContext";
import { useProfile } from "../hooks/useProfile";
import LoadingScreen from "../components/LoadingScreen";
import { BE_BRANDS } from "../lib/dummy";
import { useFriendProfile } from "../hooks/useFriendProfile";

// Profile Tabs
const ActivityList = () => {
  return (
    <ScrollView className="h-screen">
      <View className="flex-1 bg-white">
        <View className="mt-2">
          {/* {feed.map((item, i: number) => (
            <ProductCard key={i} product={item.product} />
          ))} */}
        </View>
      </View>
    </ScrollView>
  );
};

const BrandsList = () => {
  const router = useRouter();

  const onGoToBrandProfile = (brand: Brand) => {
    router.navigate({
      pathname: "/screens/brand",
      params: brand,
    });
  };

  return (
    <View className="flex-1 p-5 bg-white">
      {BE_BRANDS.map((brand: Brand, i: number) => (
        <View key={i} className="flex-row items-center py-2">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => onGoToBrandProfile(brand)}
          >
            {/* <Image src={brand.logo} className="w-8 h-8 mr-2 rounded" /> */}
            <View>
              <Text className="font-semibold">{brand.name}</Text>
            </View>
          </TouchableOpacity>
          <View className="!ml-auto flex-row items-center items-end space-x-2">
            <FontAwesome name="plus-circle" size={20} />
            <FontAwesome name="bookmark-o" size={20} />
          </View>
        </View>
      ))}
    </View>
  );
};

const renderScene = SceneMap({
  activity: ActivityList,
  brands: BrandsList,
});

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

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const user: any = useLocalSearchParams();
  const { data, loading, error } = useProfile(user?.id || "");
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "activity", title: "Activity" },
    { key: "brands", title: "Top Brands" },
  ]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (data === null) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <Text className="text-base text-zinc-500">
          Something went wrong. Please try again!
        </Text>
        <View className="flex-row items-center justify-center space-x-4">
          <TouchableOpacity
            className="px-4 py-2 bg-white border border-gray-300 rounded-full"
            onPress={() => {
              Storage.removeItem("AUTH");
              logout();
            }}
          >
            <Text className="text-sm">Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="flex-col items-center space-y-4">
        <Avatar src={data.avatar} size="xl" />

        <View>
          <Text className="font-semibold">
            {data.firstName} {data.lastName} {user ? "Friends" : "Mine"}
          </Text>
          <Text className="text-muted">@{data.username}</Text>
        </View>

        <ProfileStats stats={data.statistics} />

        <View className="flex-row items-center justify-center space-x-4">
          <TouchableOpacity
            className="px-4 py-2 bg-white border border-gray-300 rounded-full"
            onPress={() => {
              /* Handle edit profile */
              // Test logout
              Storage.removeItem("AUTH");
              logout();
            }}
          >
            <Text className="text-sm">Edit profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-4 py-2 bg-white border border-gray-300 rounded-full"
            onPress={() => {
              /* Handle share profile */
            }}
          >
            <Text className="text-sm">Share profile</Text>
          </TouchableOpacity>
        </View>
      </View>

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

export default Profile;

const ProfileStats = ({ stats }: { stats: UserStats }) => {
  return (
    <View className="flex flex-row items-center w-4/5 px-4 py-2 mt-4 border border-gray-200 rounded-lg">
      <View className="flex-col items-center w-1/3">
        <Text className="font-semibold">{stats.followerCount}</Text>
        <Text className="text-sm text-muted">followers</Text>
      </View>
      <View className="flex-col items-center w-1/3">
        <Text className="font-semibold">{stats.followingCount}</Text>
        <Text className="text-sm text-muted">following</Text>
      </View>
      <View className="flex-col items-center w-1/3">
        <Text className="font-semibold">{stats.rankedProductCount}</Text>
        <Text className="text-sm text-muted">products</Text>
      </View>
    </View>
  );
};

export const ProfileScreenHeader = ({ side }: { side: string }) => {
  return (
    <>
      {side === "left" && (
        <View className="flex-row items-center px-4">
          <ToteTitle />
        </View>
      )}
      {side === "right" && (
        <View className="flex-row items-center px-4 space-x-2">
          <Feather name="share-2" size={20} />
          <FontAwesome name="bell-o" size={20} />
        </View>
      )}
    </>
  );
};
