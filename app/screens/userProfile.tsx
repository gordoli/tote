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
import { UserStats } from "@/app/lib/types";
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

const UserProfile = ({ userId }: { userId?: string }) => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const user: any = useLocalSearchParams();
  const { currUser } = useCurrentUser();
  const isCurrentUser = userId || (currUser && currUser.id === user.id);
  const {
    data,
    loading,
    error,
    products,
    handleGetProducts,
    brands,
    handleGetBrands,
  } = useProfile(user.id || userId);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "products", title: "Products" },
    { key: "brands", title: "Brands" },
  ]);

  const renderScene = SceneMap({
    products: () => <ProductList products={products || []} />,
    brands: () => <BrandList brands={brands || []} />,
  });

  if (loading) {
    return <LoadingScreen />;
  }

  const handleGoToEdit = () => {
    router.navigate({
      pathname: "/screens/editProfile",
      params: data || {},
    });
  };

  const handleGoToChangePassword = () => {
    router.navigate({
      pathname: "/screens/changePassword",
      params: {
        screen: "profile"
      },
    });
  };

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
                handleGoToEdit();
              }}
            >
              <Text className="text-sm">Edit profile</Text>
            </TouchableOpacity>
          ) : (
            <FollowButton
              userId={data.id || "-1"}
              isFollowing={data.isFollowed}
            />
          )}

          {/* <TouchableOpacity
            className="px-4 py-2 bg-white border border-gray-300 rounded-full"
          >
            <Text className="text-sm">Share profile</Text>
          </TouchableOpacity> */}
          {isCurrentUser && (
            <TouchableOpacity
              className="px-4 py-2 bg-white border border-gray-300 rounded-full"
              onPress={() => {
                handleGoToChangePassword();
              }}
            >
              <Text className="text-sm">Change Password</Text>
            </TouchableOpacity>
          )}
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
  const router = useRouter();

  const handleGoToFollowers = (initialIndex: number) => {
    router.navigate({
      pathname: "/screens/followers",
      params: { initialIndex },
    });
  };

  return (
    <View className="flex flex-row items-center w-4/5 px-4 py-2 mt-4 border border-gray-200 rounded-lg">
      <TouchableOpacity
        className="flex-col items-center w-1/3"
        onPress={() => handleGoToFollowers(0)}
      >
        <Text className="font-semibold">{stats.followerCount}</Text>
        <Text className="text-sm text-muted">followers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-col items-center w-1/3"
        onPress={() => handleGoToFollowers(1)}
      >
        <Text className="font-semibold">{stats.followingCount}</Text>
        <Text className="text-sm text-muted">following</Text>
      </TouchableOpacity>

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
