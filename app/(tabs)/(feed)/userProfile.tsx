import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import {
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";

import Avatar from "../../components/Avatar";
import ToteTitle from "../../components/ToteTitle";
import { View, Text } from "@/app/components/Themed";
import {
  DUMMY_FEED_ITEMS,
  FeedItem,
  UserStats,
  DUMMY_BRANDS,
  Brand,
  User,
} from "@/app/lib/types";
import ProductCard from "../../components/ProductCard";
import Storage from "../../lib/storage";
import { AuthContext } from "../../lib/globalContext";
import { useFriendProfile } from "../../hooks/useFriendProfile";
import LoadingScreen from "../../components/LoadingScreen";

// Profile Tabs
const ActivityList = () => {
  const [feed] = useState<FeedItem[]>(DUMMY_FEED_ITEMS);
  return (
    <ScrollView className="h-screen">
      <View className="flex-1 bg-white">
        <View className="mt-2">
          {feed.map((item, i: number) => (
            <ProductCard key={i} product={item.product} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const BrandsList = () => {
  const router = useRouter();

  const onGoToBrandProfile = (brand: Brand) => {
    router.navigate({
      pathname: "/(search)/brand",
      params: brand,
    });
  };

  return (
    <View className="flex-1 p-5 bg-white">
      {DUMMY_BRANDS.map((brand: Brand, i: number) => (
        <View key={i} className="flex-row items-center py-2">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => onGoToBrandProfile(brand)}
          >
            <Image src={brand.logo} className="w-8 h-8 mr-2 rounded" />
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

const UserProfile = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const user: User = useLocalSearchParams();
  const { data, loading, handleGetUserById } = useFriendProfile(user.id);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "activity", title: "Activity" },
    { key: "brands", title: "Top Brands" },
  ]);

  useEffect(() => {
    handleGetUserById();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (data === null) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Text className="text-base text-zinc-500">Something went wrong. Please try again!</Text>
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
            <BrandProfileScreenHeader
              side="left"
              onBack={() => router.back()}
            />
          ),
          headerTitle: () => <BrandProfileScreenHeader side="center" />,
          headerRight: () => <BrandProfileScreenHeader side="right" />,
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      <View className="flex-col items-center space-y-4">
        <Avatar src={data.avatar || "https://i.pravatar.cc/150?img=26"} size="xl" />

        <View>
          <Text className="font-semibold">{data.firstName} {data.lastName}</Text>
          <Text className="text-muted">@{data.username}</Text>
        </View>

        <ProfileStats stats={data.statistics} />

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

const BrandProfileScreenHeader = ({
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
