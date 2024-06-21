import * as React from "react";
import { Stack } from "expo-router";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useWindowDimensions, ScrollView, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  Entypo,
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import RankModals from "../screens/rankModals";
import { useBrand } from "../hooks/useBrand";
import Avatar from "@/app/components/Avatar";
import RatingCircle from "../components/RatingCircle";
import { View, Text } from "@/app/components/Themed";
import ToteTitle from "@/app/components/ToteTitle";
import LoadingScreen from "../components/LoadingScreen";
import { Brand, RankProducts, FeedItem } from "@/app/lib/types";

const TrendingTab = React.memo(({ data, loading, focused }: { data: FeedItem[], loading: boolean, focused: boolean}) => {
  
  if (focused && loading) {
    return <LoadingScreen />;
  }

  if (data.length === 0) {
    return (
     <View className="flex-1 bg-white justify-center items-center">
       <Text className="text-base text-zinc-500">Data is empty</Text>
     </View>
    );
   }

   return (
     <ScrollView className="h-screen">
       <View className="flex-1 bg-white">
        <View className="mt-2">
          {data.map((item: any, i: number) => (
            <FriendsItemCard key={`${item.id}-${i}`} item={item} />
          ))}
        </View>
       </View>
     </ScrollView>
   );
});

const FriendsTab = React.memo(({ data }: { data: FeedItem[]}) => {
  if (data.length === 0) {
   return (
    <View className="flex-1 bg-white justify-center items-center">
      <Text className="text-base text-zinc-500">Data is empty</Text>
    </View>
   );
  }
  return (
    <ScrollView className="h-screen">
      <View className="flex-1 bg-white">
        <View className="mt-2">
          {data.map((item: any, i: number) => (
            <FriendsItemCard key={`${item.id}-${i}`} item={item} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
});

const renderTabBar = (props: any) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#0065FF" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => (
      <View className="flex-row items-center justify-between">
        {/* {route.key === "friends" ? (
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

const BrandProfile = () => {
  const router = useRouter();
  const modalizeModal = React.useRef(null);
  const brand: Brand = useLocalSearchParams();
  const layout = useWindowDimensions();
  const [focused, setFocused] = React.useState(false);
  const {
    brandDetail,
    friendsRanked,
    allRanked,
    loading,
    loadingTab,
    loadingStep,
    categories,
    rankingData,
    handleFetchAllRanked,
    handleGetCategories,
    handleUpdateRankingData,
    handleRankProduct,
  } = useBrand(brand.id);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "friends", title: "Friends" },
    { key: "trending", title: "Trending" },
  ]);

  const openModal = () => {
    handleGetCategories();
    modalizeModal.current?.open();
  };

  const cancelModal = () => {
    handleUpdateRankingData({
      rate: 0,
      brandId: brand.id,
      categoryId: 0,
      link: "",
      image: "",
      name: "",
      description: "",
      // preferProductId: 0,
    });
    modalizeModal.current?.close();
  };

  const onRankProduct = () => {
    handleRankProduct(() => {
      cancelModal();
    });
  };

  const onOpenWebsite = (linkUrl: string | undefined) => {
    if (linkUrl) {
      Linking.openURL(linkUrl);
    }
  };

  const renderScene = SceneMap({
    friends: () => <FriendsTab data={friendsRanked} />,
    trending: () => <TrendingTab data={allRanked} loading={loadingTab} focused={focused} />,
  });
  
  if (loading) {
    return <LoadingScreen />;
  }

  if (brandDetail === null) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <Stack.Screen
          options={{
            title: "Tote",
            headerLeft: () => (
              <BrandProfileScreenHeader
                side="left"
                onBack={() => router.back()}
              />
            ),
            headerTitle: "",
            headerRight: () => <BrandProfileScreenHeader side="right" />,
            headerShadowVisible: false,
            headerBackVisible: false,
          }}
        />
        <Text className="text-base text-zinc-500">Something went wrong. Please try again!</Text>
      </View>
    );
  }

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
          headerTitle: "",
          headerRight: () => <BrandProfileScreenHeader side="right" />,
          headerShadowVisible: false,
          headerBackVisible: false,
        }}
      />
      {/* <ScrollView className="h-screen"> */}
      <Image src={brandDetail.cover || brand.cover} className="w-full h-1/5" resizeMode="cover" />
      <View className="flex-row items-center w-full px-4 space-y-4">
        <View className="h-full mt-4" style={styles.logoLeft}>
          <View className="p-1" style={styles.logoPhotoContainer}>
            <Image
              src={brandDetail.logo || brand.logo}
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
              <Text className="text-2xl font-bold">{brandDetail.name}</Text>
            </View>
            <Text className="text-base text-zinc-500">{brandDetail.description}</Text>
          </View>
        </View>
      </View>

      <View className="w-full px-4 space-y-4">
        <RatingElements ranks={brandDetail.rankProducts} />
        <View className="flex flex-row items-center justify-between my-3">
          <TouchableOpacity
            className="flex-row items-center justify-center py-2 bg-gray-200 rounded-lg"
            style={styles.websiteButton}
            onPress={() => onOpenWebsite(brandDetail.website)}
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
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(index) => {
          if (index === 1) {
            handleFetchAllRanked();
            setFocused(true);
          } else {
            setFocused(false);
          }
          setIndex(index);
        }}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      {/* </ScrollView> */}
      <RankModals
        cancelModal={cancelModal}
        modalizeRef={modalizeModal}
        loading={loadingStep}
        categories={categories}
        data={rankingData}
        handleUpdateRankingData={handleUpdateRankingData}
        handleRankProduct={onRankProduct}
      />
    </View>
  );
};

export default BrandProfile;

const RatingElements = ({ranks}: { ranks: RankProducts}) => {
  return (
    <View className="flex flex-row items-center justify-around my-3">
      <View
        className="items-center border border-gray-200 rounded-lg"
        style={styles.ratingElement}
      >
        <Text className="text-sm">My rating</Text>
        <Text className="font-semibold">{ranks.userRating}</Text>
      </View>
      <View
        className="items-center border border-gray-200 rounded-lg"
        style={styles.ratingElement}
      >
        <Text className="text-sm">Friends rating</Text>
        <Text className="font-semibold">{ranks.friendsRating}</Text>
      </View>
      <View
        className="items-center border border-gray-200 rounded-lg"
        style={styles.ratingElement}
      >
        <Text className="text-sm">Overall rating</Text>
        <Text className="font-semibold">{ranks.overallRanking}</Text>
      </View>
    </View>
  );
};

const FriendsItemCard = ({ item }: { item: any }) => {
  return (
    <View className="p-6 space-y-4 border-b border-gray-200">
      <View className="flex-row items-center w-full mb-4">
        <Avatar src={item.createdBy.avatar || "https://i.pravatar.cc/150?img=26"} />
        <View className="ml-2">
          <Text className="font-bold">{item.createdBy.username}</Text>
          <Text className="text-sm text-zinc-500">{item.category.name}</Text>
        </View>
        <View className="ml-auto">
          <RatingCircle rating={item.rate} />
        </View>
      </View>
      <View className="relative">
        <Image src={item.image || "https://i.ibb.co/LgVWqh6/nike-airmax.png"} className="w-full rounded-lg aspect-video" />
        <View className="absolute bottom-0 left-0 w-full p-4 rounded-b-lg bg-black/60">
          <Text className="font-semibold text-white">{item.name}</Text>
        </View>
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
      {/* {side === "right" && (
        <View className="flex-row items-center px-4 space-x-2">
          <Entypo name="dots-three-horizontal" size={20} color="gray" />
        </View>
      )} */}
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
    // position: "absolute",
    // top: -20,
    // borderRadius: 15,
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
