import { useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import {
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";
import {
  FontAwesome,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";

import Avatar from "../components/Avatar";
import ToteTitle from "../components/ToteTitle";
import { View, Text } from "@/app/components/Themed";
import {
  DUMMY_FEED_ITEMS,
  FeedItem,
  CURRENT_USER,
  UserStats,
  DUMMY_BRANDS,
  Brand,
  User,
} from "@/app/lib/types";
import ProductCard from "../components/ProductCard";
import { useLocalSearchParams, useRouter } from "expo-router";

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
      pathname: "/screens/brand",
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
        {/* {route.key === "activity" ? (
          <MaterialCommunityIcons
            name="heart-circle-outline"
            color={focused ? "#0065FF" : "#787878"}
            size={20}
          />
        ) : (
          <FontAwesome
            name="shopping-bag"
            color={focused ? "#0065FF" : "#787878"}
            size={16}
          />
        )} */}
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
  const user: User = useLocalSearchParams();
  const currUser = user && user.id ? user : CURRENT_USER;

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "activity", title: "Activity" },
    { key: "brands", title: "Top Brands" },
  ]);

  return (
    <View className="flex-1">
      <View className="flex-col items-center space-y-4">
        <Avatar src={currUser.avatar} size="xl" />

        <View>
          <Text className="font-semibold">{currUser.name}</Text>
          <Text className="text-muted">@{currUser.username}</Text>
        </View>

        <ProfileStats stats={currUser.stats} />

        <View className="flex-row items-center justify-center space-x-4">
          <TouchableOpacity
            className="px-4 py-2 bg-white border border-gray-300 rounded-full"
            onPress={() => {
              /* Handle edit profile */
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
        <Text className="font-semibold">{stats.followers}</Text>
        <Text className="text-sm text-muted">followers</Text>
      </View>
      <View className="flex-col items-center w-1/3">
        <Text className="font-semibold">{stats.following}</Text>
        <Text className="text-sm text-muted">following</Text>
      </View>
      <View className="flex-col items-center w-1/3">
        <Text className="font-semibold">{stats.products}</Text>
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
