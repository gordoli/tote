import { useState } from "react";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { TouchableOpacity, useWindowDimensions, ScrollView, Image, StyleSheet } from "react-native";
import { FontAwesome, Feather, MaterialCommunityIcons, Entypo, Ionicons } from "@expo/vector-icons";

import Avatar from "../components/Avatar";
import ToteTitle from "../components/ToteTitle";
import { View, Text } from "@/app/components/Themed";
import ProductView from "@/app/components/ProductView";
import RatingCircle from "../components/RatingCircle";
import { DUMMY_FEED_ITEMS, FeedItem, CURRENT_USER, UserStats } from "@/app/lib/types";

// Profile Tabs
const FirstRoute = () => {
  const [feed] = useState<FeedItem[]>(DUMMY_FEED_ITEMS);
  return (
    <ScrollView className="h-screen">
    <View className="flex-1 bg-white">
      <View className="mt-2">
        {feed.map((item, i: number) => (
          <BrandItemCard key={i} item={item} />
        ))}
      </View>
    </View>
    </ScrollView>
  );
};

const SecondRoute = () => {
  return (
    <View className="flex-1 p-5 bg-white">
      <View className="flex flex-row items-center justify-between my-3">
        <TouchableOpacity className="flex-row justify-center items-center" >
          <Text className="text-base font-semibold" style={styles.newListButton}>New List</Text>
          <Entypo name="plus" size={22} color="#0C66E4" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-center items-center rounded-lg py-2" >
          <Text className="text-base text-gray-600 font-semibold">Edit</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row flex-wrap w-full justify-between">
        <TouchableOpacity style={styles.toteItemContainer}>
          <View className="bg-gray-300 p-2 rounded">
            <MaterialCommunityIcons name="ceiling-fan-light" size={24} color="gray" />
          </View>
          <Text className="text-base text-black font-semibold">Ski Gear</Text>
          <Text className="text-sm text-gray-500">8 items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toteItemContainer}>
          <View className="bg-gray-300 p-2 rounded">
            <FontAwesome name="user" size={24} color="gray" />
          </View>
          <Text className="text-base text-black font-semibold">Clothers</Text>
          <Text className="text-sm text-gray-500">12 items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toteItemContainer}>
          <View className="bg-gray-300 p-2 rounded">
            <MaterialCommunityIcons name="television" size={24} color="gray" />
          </View>
          <Text className="text-base text-black font-semibold">PC Equipment</Text>
          <Text className="text-sm text-gray-500">45 items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toteItemContainer}>
          <View className="bg-gray-300 p-2 rounded">
            <Ionicons name="game-controller" size={24} color="gray" />
          </View>
          <Text className="text-base text-black font-semibold">Gaming</Text>
          <Text className="text-sm text-gray-500">64 items</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const renderScene = SceneMap({
  activity: FirstRoute,
  owned: SecondRoute,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <View className="flex-row items-center justify-between">
        {route.key === "activity" ? (
          <MaterialCommunityIcons
            name="heart-circle-outline"
            color={focused ? '#0C66E4' : "#787878"}
            size={20}
          />
        ) : (
          <FontAwesome
            name="shopping-bag"
            color={focused ? '#0C66E4' : "#787878"}
            size={16}
          />
        )}
        <Text
          style={{ color: focused ? '#0C66E4' : "#787878", margin: 8 }}
          className="text-base font-semibold"
        >
          {route.title}
        </Text>
      </View>
      
    )}
  />
);

const Profile = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "activity", title: "Activity" },
    { key: "owned", title: "Totes" },
  ]);

  return (
    <View className="flex-1">
      <View className="flex-col items-center space-y-4">
        <Avatar src={CURRENT_USER.avatar} size="xl" />

        <View>
          <Text className="font-semibold">{CURRENT_USER.name}</Text>
          <Text className="text-muted">@{CURRENT_USER.username}</Text>
        </View>

        <ProfileStats stats={CURRENT_USER.stats} />

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

const BrandItemCard = ({ item }: { item: FeedItem }) => {
  return (
    <View className="p-6 space-y-4 border-b border-gray-200">
      <View className="flex-row items-center w-full mb-4">
        <Image src={item.product.brand.logo} className="h-10 w-10 rounded-lg" />
        <View className="ml-2">
          <Text className="font-bold">{item.product.name}</Text>
          <Text className="text-sm text-zinc-500">{item.product.brand.account}</Text>
        </View>
        <View className="ml-auto">
          <RatingCircle rating={item.product.rating} />
        </View>
      </View>
      <ProductView product={item.product} />
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

const styles = StyleSheet.create({
  newListButton: {
    color: '#0C66E4',
  },
  toteItemContainer: {
    width: "47%",
    backgroundColor: "#E8E8E8",
    marginBottom: 20,
    padding: 20,
    alignItems: "center",
    borderRadius: 14,
  },
});