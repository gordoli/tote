import { useRef, useState } from "react";
import { View, Text, ScrollView } from "@/app/components/Themed";
import Avatar from "@/app/components/Avatar";
import { Brand, FeedActivity, User } from "@/app/lib/types";
import ProductView from "@/app/components/product/ProductView";
import RatingCircle from "../components/RatingCircle";
import { getFirstName, formatRelativeDate } from "../lib/helpers";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter, Stack } from "expo-router";
import { useFeed } from "../hooks/useFeed";
import LoadingScreen from "../components/LoadingScreen";
import EmptyState from "../components/EmptyState";
import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import RankModals from "../screens/rankModals";
import BaseScreenHeader from "../components/BaseScreenHeader";

const Feed = () => {
  const { data, loading, error } = useFeed();
  const { currUser } = useCurrentUser();
  const modalizeModal = useRef<any>();
  const [itemSelected, setItemSelected] = useState<any>(null);

  const openModal = (item: any) => {
    setItemSelected(item);
    setTimeout(() => {
      modalizeModal.current?.open();
    }, 500);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    !data ||
    (data.length === 0 ? (
      <EmptyState label="No feed activities found" />
    ) : (
      <View className="flex-1">
        <ScrollView className="flex-1">
          <Stack.Screen
            options={{
              headerLeft: () => <BaseScreenHeader side="left" />,
            }}
          />
          {data &&
            data
              .filter((e) => e.rankProduct !== null)
              .map((item, i: number) => (
                <FeedItemCard
                  key={i}
                  item={item}
                  currUser={currUser}
                  onEditRankProduct={() => openModal(item.rankProduct)}
                />
              ))}
        </ScrollView>
        <RankModals
          modalizeRef={modalizeModal}
          brandId={itemSelected ? itemSelected.brand.id : 0}
          rankProduct={itemSelected}
        />
      </View>
    ))
  );
};

export default Feed;

const FeedItemCard = ({
  item,
  currUser,
  onEditRankProduct,
}: {
  item: FeedActivity;
  currUser: User | undefined;
  onEditRankProduct: () => void;
}) => {
  const router = useRouter();
  const contentMap: { [key: string]: string } = {
    rank_product: "ranked",
    wishlisted: "wishlisted",
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
      <View className="flex-row items-start w-full mb-4">
        <TouchableOpacity onPress={() => onUserClick(item.createdBy)}>
          <Avatar
            src={
              item.rankProduct.wishlisted
                ? currUser
                  ? currUser.avatar
                  : null
                : item.createdBy.avatar
            }
          />
        </TouchableOpacity>

        <View className="ml-2">
          <View className="flex-row flex-wrap items-center gap-1">
            <Text className="font-bold">
              {item.rankProduct.wishlisted
                ? "You"
                : getFirstName(item.createdBy.username)}
            </Text>
            <Text>
              {
                contentMap[
                  item.rankProduct.wishlisted ? "wishlisted" : item.type
                ]
              }
            </Text>
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

      <ProductView
        product={item.rankProduct}
        isCurrUser={item.createdBy?.id === currUser?.id}
        onEditRankProduct={onEditRankProduct}
      />

      {/* Don't need until phase 2 with social functions */}
      {/* <View className="flex-row items-center w-full space-x-2">
        <FontAwesome name="heart-o" size={20} />
        <FontAwesome name="comment-o" size={20} />
      </View> */}
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
