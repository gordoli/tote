import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import {
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";

import Avatar from "../components/Avatar";
import ToteTitle from "../components/ToteTitle";
import { View, Text } from "@/app/components/Themed";
import { UserStats, Brand, Product } from "@/app/lib/types";
import Storage from "../lib/storage";
import { AuthContext } from "../lib/globalContext";
import LoadingScreen from "../components/LoadingScreen";
import { useProfile } from "../hooks/useProfile";
import { useCurrentUser } from "../hooks/useCurrentUser";
import FollowButton from "../components/FollowButton";
import { useProductList } from "../hooks/useProductList";
import ProductList from "../components/product/ProductList";
import { useBrandList } from "../hooks/useBrandList";
import BrandList from "../components/brand/BrandList";

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

const UserProfile = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const user: any = useLocalSearchParams();

  const { currUser } = useCurrentUser();
  const isCurrentUser = !user.id || (currUser && currUser.id === user.id);
  const currUserId = user ? user.id : currUser?.id;
  const rootScreen = user.screen;
  const { data, loading, error } = useProfile(user.id);
  const { products } = useProductList(currUserId);
  const { brands } = useBrandList(currUserId);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "products", title: "Products" },
    { key: "brands", title: "Brands" },
  ]);

  const renderScene = SceneMap({
    products: () => <ProductList products={products} />,
    brands: () => <BrandList brands={brands} />,
  });

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
      <Stack.Screen
        options={{
          title: "Tote",
          headerLeft: () => (
            <UserProfileScreenHeader side="left" onBack={() => router.back()} />
          ),
          headerTitle: () => <UserProfileScreenHeader side="center" />,
          headerRight: () => <UserProfileScreenHeader side="right" />,
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      <View className="flex-col items-center space-y-4">
        <Avatar
          src={data.avatar || "https://i.pravatar.cc/150?img=26"}
          size="xl"
        />

        <View>
          <Text className="font-semibold">
            {data.firstName} {data.lastName}
          </Text>
          <Text className="text-muted">@{data.username}</Text>
        </View>

        <ProfileStats stats={data.statistics} />

        <View className="flex-row items-center justify-center space-x-4">
          {isCurrentUser ? (
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
          ) : (
            <FollowButton />
          )}

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

export default UserProfile;

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

const UserProfileScreenHeader = ({
  side,
  onBack,
}: {
  side: string;
  onBack?: () => void;
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
          <ToteTitle customStyles={styles.titleHeader} />
        </View>
      )}
      {side === "right" && (
        <View className="flex-row items-center px-4 space-x-2">
          <Entypo name="dots-three-horizontal" size={20} color="gray" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    paddingLeft: 10,
  },
});
