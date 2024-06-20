import { useState } from "react";
import { View, Text } from "@/app/components/Themed";
import Avatar from "@/app/components/Avatar";
import { Brand, DUMMY_FEED_ITEMS, FeedItem, User } from "@/app/lib/types";
import { Button, ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ToteTitle from "@/app/components/ToteTitle";
import ProductView from "@/app/components/ProductView";
import RatingCircle from "../../components/RatingCircle";
import { getFirstName, formatRelativeDate } from "../../lib/helpers";
import NotificationBell from "../../components/NotificationBell";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const Feed = () => {
  const [feed, setFeed] = useState<FeedItem[]>(DUMMY_FEED_ITEMS);

  return (
    <ScrollView className="h-screen">
      {feed.map((item, i: number) => (
        <FeedItemCard key={i} item={item} />
      ))}
    </ScrollView>
  );
};

export default Feed;

const FeedItemCard = ({ item }: { item: FeedItem }) => {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `${item.product.name} added to your wishlist`,
      position: "bottom",
    });
  };

  const onBookmarkClick = () => {
    setWishlisted(!wishlisted);
    showToast();
  };

  const onGoToBrandProfile = (brand: Brand) => {
    router.navigate({
      pathname: "/(feed)/brand",
      params: brand,
    });
  };

  const onUserClick = (user: User) => {
    router.navigate({
      pathname: "/(feed)/userProfile",
      params: user,
    });
  };

  return (
    <View className="p-6 space-y-4 border-b border-gray-200">
      <View className="flex-row items-start w-full mb-4">
        <TouchableOpacity onPress={() => onUserClick(item.user)}>
          <Avatar src={item.user.avatar} />
        </TouchableOpacity>

        <View className="ml-2">
          <View className="flex-row flex-wrap items-center gap-1">
            <Text className="font-bold">{getFirstName(item.user.name)}</Text>
            <Text>{item.content}</Text>
            <Text className="font-bold">{item.product.category}</Text>
            <Text>from</Text>
            <TouchableOpacity
              onPress={() => onGoToBrandProfile(item.product.brand)}
            >
              <Text className="font-bold">{item.product.brand.name}</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-sm text-muted">
            {formatRelativeDate(item.createdTime)}
          </Text>
        </View>

        <View className="flex-row items-center ml-auto">
          <RatingCircle rating={item.product.rating} />
        </View>
      </View>

      <ProductView product={item.product} />

      {/* Don't need until phase 2 with social functions */}
      <View className="flex-row items-center w-full space-x-2">
        <TouchableOpacity onPress={onBookmarkClick}>
          <FontAwesome
            name={wishlisted ? "bookmark" : "bookmark-o"}
            size={20}
          />
        </TouchableOpacity>
        <FontAwesome name="heart-o" size={20} />
        {/* <FontAwesome name="comment-o" size={20} /> */}
      </View>
    </View>
  );
};

// export const FeedScreenHeader = ({ side }: { side: string }) => {
//   return (
//     <>
//       {side === "left" && (
//         <View className="flex-row items-center px-4">
//           <ToteTitle />
//         </View>
//       )}

//       {side === "right" && (
//         <View className="flex-row items-center px-4 space-x-2">
//           {/* <FontAwesome name="search" size={20} /> */}
//           <NotificationBell />
//         </View>
//       )}
//     </>
//   );
// };
