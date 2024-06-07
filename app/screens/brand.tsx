import * as React from "react";
import { Stack } from "expo-router";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import RankModals from "./rankModals";
import Avatar from "@/app/components/Avatar";
import ProductView from "@/app/components/ProductView";
import RatingCircle from "../components/RatingCircle";
import { View, Text } from "@/app/components/Themed";
import ToteTitle from "@/app/components/ToteTitle";
import { DUMMY_FEED_ITEMS, FeedItem, Brand } from "@/app/lib/types";

const { width } = Dimensions.get("screen");

const TrendingTab = () => (
  <View style={{ flex: 1, backgroundColor: "green" }} />
);

const FriendsTab = () => {
  const [feed] = React.useState<FeedItem[]>(DUMMY_FEED_ITEMS);
  return (
    <ScrollView className="h-screen">
      <View className="flex-1 bg-white">
        <View className="mt-2">
          {feed.map((item, i: number) => (
            <FriendsItemCard key={i} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const renderScene = SceneMap({
  friends: FriendsTab,
  trending: TrendingTab,
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "black" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <View className="flex-row items-center justify-between">
        {route.key === "friends" ? (
          <MaterialCommunityIcons
            name="heart-circle-outline"
            color={focused ? "#0065FF" : "#787878"}
            size={20}
          />
        ) : (
          <MaterialCommunityIcons
            name="fire"
            color={focused ? "#0065FF" : "#787878"}
            size={22}
          />
        )}
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

const BrandProfile = () => {
  const router = useRouter();
  const modalizeModal = React.useRef(null);
  const brand: Brand = useLocalSearchParams();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "friends", title: "Friends" },
    { key: "trending", title: "Trending" },
  ]);

  const openModal = () => {
    modalizeModal.current?.open();
  };

  const cancelModal = () => {
    modalizeModal.current?.close();
  };

  const buttonsRender = () => {
    return (
      <View className="flex flex-row items-center justify-between my-3">
        <TouchableOpacity
          className="flex-row items-center justify-center py-2 bg-gray-200 rounded-lg"
          style={styles.websiteButton}
        >
          <Text className="px-1 text-sm text-gray-500">Website</Text>
          <AntDesign name="earth" size={20} color="#787878" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center py-2 rounded-lg"
          style={styles.rankButton}
          onPress={openModal}
        >
          <Text className="text-sm font-semibold text-white">Rank</Text>
          <Entypo name="plus" size={22} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
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
      {/* <ScrollView className="h-screen"> */}
      <Image src={brand.cover} className="w-full h-1/5" resizeMode="cover" />
      <View className="flex-row items-center w-full px-4 space-y-4">
        <View className="h-full" style={styles.logoLeft}>
          <View className="p-1" style={styles.logoPhotoContainer}>
            <Image
              src={brand.logo}
              resizeMode="contain"
              style={styles.logoPhoto}
            />
          </View>
        </View>
        <View
          className="flex-row items-center mb-4"
          style={styles.brandNameContainer}
        >
          <View className="ml-2">
            <View className="flex-row items-center space-x-1">
              <Text className="text-2xl font-bold">{brand.name}</Text>
            </View>
            <Text className="text-base text-zinc-500">{brand.account}</Text>
          </View>
          <View className="ml-auto">
            <FontAwesome name="bookmark-o" size={20} />
          </View>
        </View>
      </View>

      <View className="w-full px-4 space-y-4">
        <RatingElements />
        {buttonsRender()}
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      {/* </ScrollView> */}
      <RankModals cancelModal={cancelModal} modalizeRef={modalizeModal} />
    </View>
  );
};

export default BrandProfile;

const RatingElements = () => {
  return (
    <View className="flex flex-row items-center justify-around my-3">
      <View
        className="items-center border border-gray-200 rounded-lg"
        style={styles.ratingElement}
      >
        <Text className="text-sm">My rating</Text>
        <Text className="font-semibold">8.4</Text>
      </View>
      <View
        className="items-center border border-gray-200 rounded-lg"
        style={styles.ratingElement}
      >
        <Text className="text-sm">Friends rating</Text>
        <Text className="font-semibold">7.7</Text>
      </View>
      <View
        className="items-center border border-gray-200 rounded-lg"
        style={styles.ratingElement}
      >
        <Text className="text-sm">Overall rating</Text>
        <Text className="font-semibold">8.2</Text>
      </View>
    </View>
  );
};

const FriendsItemCard = ({ item }: { item: FeedItem }) => {
  return (
    <View className="p-6 space-y-4 border-b border-gray-200">
      <View className="flex-row items-center w-full mb-4">
        <Avatar src={item.user.avatar} />
        <View className="ml-2">
          <Text className="font-bold">{item.user.name}</Text>
          <Text className="text-sm text-zinc-500">{item.user.username}</Text>
        </View>
        <View className="ml-auto">
          <RatingCircle rating={item.product.rating} />
        </View>
      </View>
      <ProductView product={item.product} />
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
  logoPhoto: {
    padding: 50,
    borderRadius: 15,
  },
  logoLeft: {
    width: "30%",
    position: "relative",
  },
  logoPhotoContainer: {
    position: "absolute",
    top: -20,
    borderRadius: 15,
    zIndex: 99,
    width: "100%",
  },
  brandNameContainer: { width: "70%" },
  ratingElement: {
    width: "30%",
    paddingVertical: 10,
  },
  websiteButton: {
    width: "48%",
  },
  rankButton: {
    width: "48%",
    backgroundColor: "#0065FF",
  },
});
