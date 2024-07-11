import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { getFirstName, formatRelativeDate } from "@/app/lib/helpers";
import { FeedActivity, Brand, User } from "@/app/lib/types";
import { useRouter } from "expo-router";
import Avatar from "../Avatar";
import RatingCircle from "../RatingCircle";
import ProductView from "../product/ProductView";
import { Text, View } from "../Themed";
import { TouchableOpacity } from "react-native";

const ActivityCard = ({ item }: { item: FeedActivity }) => {
  const router = useRouter();
  const { currUser } = useCurrentUser();

  const contentMap: { [key: string]: string } = {
    rank_product: "ranked",
  };

  const onGoToBrandProfile = (brand: Brand | undefined) => {
    if (!brand) return;
    router.navigate({
      pathname: "/screens/brand",
      params: { ...brand, screen: "feed" },
    });
  };

  const onUserClick = (user: User | undefined) => {
    router.navigate({
      pathname: "/screens/userProfile",
      params: { ...user, screen: "feed" },
    });
  };

  return (
    <View className="p-6 space-y-4 border-b border-gray-200">
      <View className="flex-row items-start w-full">
        <TouchableOpacity onPress={() => onUserClick(item.createdBy)}>
          <Avatar src={item.createdBy.avatar} />
        </TouchableOpacity>

        <View className="ml-2">
          <View className="flex-row flex-wrap items-center gap-1">
            <TouchableOpacity onPress={() => onUserClick(item.createdBy)}>
              <Text className="font-bold">
                {currUser?.id === item.createdBy.id
                  ? "You"
                  : getFirstName(item.createdBy.username)}
              </Text>
            </TouchableOpacity>
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

      <Text className="mb-4">{item.rankProduct.description}</Text>

      <ProductView product={item.rankProduct} />
    </View>
  );
};

export default ActivityCard;
