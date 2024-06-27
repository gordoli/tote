import { useEffect, useState } from "react";
import { View, Text } from "@/app/components/Themed";
import Avatar from "@/app/components/Avatar";
import { Brand, FeedActivity, User } from "@/app/lib/types";
import { ScrollView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ProductView from "@/app/components/product/ProductView";
import RatingCircle from "../components/RatingCircle";
import { getFirstName, formatRelativeDate } from "../lib/helpers";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useFeed } from "../hooks/useFeed";
import LoadingScreen from "../components/LoadingScreen";
import { useWishlist } from "../hooks/useWishlist";

const Feed = () => {
  const { data, loading, error } = useFeed();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView className="h-screen">
      {data &&
        data.map((item, i: number) => <FeedItemCard key={i} item={item} />)}
    </ScrollView>
  );
};

export default Feed;

const FeedItemCard = ({ item }: { item: FeedActivity }) => {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);

  const contentMap: { [key: string]: string } = {
    rank_product: "ranked",
  };

  const { handleAddToWishlist } = useWishlist();

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `${item.rankProduct.name} added to your wishlist`,
      position: "bottom",
    });
  };

  const onBookmarkClick = () => {
    handleAddToWishlist(item.rankProduct.id);
    console.log("Here");
    setWishlisted(!wishlisted);
    showToast();
  };

  const onGoToBrandProfile = (brand: Brand | undefined) => {
    if (!brand) return;
    router.navigate({
      pathname: "/screens/brand",
      params: brand,
    });
  };

  const onUserClick = (user: User | undefined) => {
    router.navigate({
      pathname: "/screens/userProfile",
      params: user,
    });
  };

  return (
    <View className="p-6 space-y-4 border-b border-gray-200">
      <View className="flex-row items-start w-full mb-4">
        <TouchableOpacity onPress={() => onUserClick(item.createdBy)}>
          <Avatar src={item.createdBy.avatar} />
        </TouchableOpacity>

        <View className="ml-2">
          <View className="flex-row flex-wrap items-center gap-1">
            <Text className="font-bold">
              {getFirstName(item.createdBy.username)}
            </Text>
            <Text>{contentMap[item.type]}</Text>
            <Text className="font-bold">{item.rankProduct.category?.name}</Text>
            <Text>from</Text>
            {item.rankProduct.brand && (
              <TouchableOpacity
                onPress={() => onGoToBrandProfile(item.rankProduct.brand)}
              >
                <Text className="font-bold">{item.rankProduct.brand.name}</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text className="text-sm text-muted">
            {formatRelativeDate(new Date(item.createdAt))}
          </Text>
        </View>

        <View className="flex-row items-center ml-auto">
          <RatingCircle rating={item.rankProduct.rate} />
        </View>
      </View>

      <ProductView product={item.rankProduct} />

      {/* Don't need until phase 2 with social functions */}
      <View className="flex-row items-center w-full space-x-2">
        <TouchableOpacity onPress={onBookmarkClick}>
          <FontAwesome
            name={wishlisted ? "bookmark" : "bookmark-o"}
            color={wishlisted ? "gold" : "black"}
            size={20}
          />
        </TouchableOpacity>
        {/* <FontAwesome name="heart-o" size={20} /> */}
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
